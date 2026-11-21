import os
import re
import logging
from typing import List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

# Load .env file if present
load_dotenv()

# ── Configuration ──────────────────────────────────────────
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
MODEL_NAME = os.getenv("MODEL_NAME", "qwen3:4b")
BACKEND_PORT = int(os.getenv("BACKEND_PORT", "8000"))

# ── Logging ────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)s  %(message)s")
logger = logging.getLogger("suai")

# ── System Prompt ──────────────────────────────────────────
SYSTEM_PROMPT = (
    "You are SUAi, an AI assistant for Sharda University Agra (SUA). "
    "Help users with university-related questions about programs, admissions, "
    "campus life, facilities, and general academic guidance. "
    "Answer clearly and concisely. "
    "Never invent official fees, deadlines, eligibility criteria, or university policies. "
    "If you do not know an official answer, say so honestly and suggest contacting "
    "the university directly. "
    "You do NOT have access to a verified university database — do not claim otherwise. "
    "Be friendly and helpful."
)

# ── FastAPI App ────────────────────────────────────────────
app = FastAPI(title="SUAi Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request / Response Models ─────────────────────────────
class HistoryMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[HistoryMessage]] = []

class ChatResponse(BaseModel):
    response: str

# ── Endpoints ─────────────────────────────────────────────
@app.get("/api/health")
async def health():
    """Check backend, Ollama connectivity, and model availability."""
    result = {"status": "ok", "ollama_url": OLLAMA_URL, "model": MODEL_NAME}

    # Check Ollama is reachable
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            r = await client.get(f"{OLLAMA_URL}/api/tags")
            r.raise_for_status()
            tags = r.json()
            available_models = [m["name"] for m in tags.get("models", [])]
            result["ollama_reachable"] = True
            result["available_models"] = available_models
            result["model_ready"] = any(
                MODEL_NAME in name for name in available_models
            )
    except Exception as e:
        result["ollama_reachable"] = False
        result["model_ready"] = False
        result["error"] = str(e)

    return result


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    """Send a message to Ollama and return the response."""
    # Validate
    if not req.message or not req.message.strip():
        return ChatResponse(response="Please type a message first.")

    # Build messages list for Ollama chat API
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # Add conversation history (last 10 messages)
    if req.history:
        for msg in req.history[-10:]:
            messages.append({"role": msg.role, "content": msg.content})

    # Prepend /no_think to disable qwen3's internal reasoning (much faster)
    user_content = "/no_think\n" + req.message.strip()
    messages.append({"role": "user", "content": user_content})

    # Call Ollama
    try:
        async with httpx.AsyncClient(timeout=300.0) as client:
            r = await client.post(
                f"{OLLAMA_URL}/api/chat",
                json={
                    "model": MODEL_NAME,
                    "messages": messages,
                    "stream": False,
                    "options": {"num_predict": 1024},
                },
            )

            if r.status_code == 404:
                return ChatResponse(
                    response=(
                        f"Model '{MODEL_NAME}' not found. "
                        f"Run `ollama pull {MODEL_NAME}` in your terminal to download it."
                    )
                )

            r.raise_for_status()
            data = r.json()
            reply = data.get("message", {}).get("content", "")

            # Strip any <think>...</think> blocks from qwen3's reasoning
            reply = re.sub(r"<think>[\s\S]*?</think>\s*", "", reply).strip()

            if not reply:
                return ChatResponse(response="I received an empty response. Please try again.")

            logger.info(f"Chat OK — {len(reply)} chars")
            return ChatResponse(response=reply)

    except httpx.ConnectError:
        logger.error("Cannot connect to Ollama")
        return ChatResponse(
            response=(
                "Cannot connect to Ollama. Make sure Ollama is running "
                "(`ollama serve` in a terminal)."
            )
        )
    except httpx.ReadTimeout:
        logger.error("Ollama request timed out")
        return ChatResponse(
            response="The AI model took too long to respond. Please try a shorter question."
        )
    except Exception as e:
        logger.error(f"Ollama error: {e}")
        return ChatResponse(response=f"Something went wrong: {e}")


# ── Run directly ──────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    logger.info(f"Starting SUAi backend on port {BACKEND_PORT}")
    logger.info(f"Ollama URL: {OLLAMA_URL}  |  Model: {MODEL_NAME}")
    uvicorn.run("main:app", host="0.0.0.0", port=BACKEND_PORT, reload=True)
