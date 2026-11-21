# SUAi Backend

Minimal FastAPI backend that connects to Ollama for local AI chat.

## Setup

1. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Make sure Ollama is running:
   ```
   ollama serve
   ```

3. Pull the model (if not already downloaded):
   ```
   ollama pull qwen3:4b
   ```

4. Start the backend:
   ```
   python main.py
   ```

   The server runs on http://localhost:8000

## Endpoints

- `GET /api/health` — Check backend and Ollama status
- `POST /api/chat` — Send a message, get AI response

## Environment Variables

Copy `.env.example` to `.env` to customize:

| Variable | Default | Description |
|---|---|---|
| `OLLAMA_URL` | `http://localhost:11434` | Ollama API URL |
| `MODEL_NAME` | `qwen3:4b` | Ollama model to use |
| `BACKEND_PORT` | `8000` | Backend server port |
