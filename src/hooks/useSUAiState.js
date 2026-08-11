import { useState, useCallback } from 'react';
import { getLocalMockReply } from '../mock/mockResponses';

export const SUAi_STATES = {
  IDLE: 'idle',
  GREETING: 'greeting',
  THINKING: 'thinking',
  SEARCHING: 'searching',
  TYPING: 'typing',
  ANSWERING: 'answering',
  EXCITED: 'excited',
  CONFUSED: 'confused',
  SUCCESS: 'success',
  ERROR: 'error',
  GOODBYE: 'goodbye'
};

export const DEFAULT_SPEECH = {
  idle: "Hey! 👋 I'm SUAi, your AI companion for Sharda University Agra!",
  greeting: "Welcome! 👋 Ask me anything about admissions, courses, fees & campus life!",
  thinking: "Hmm... let me check that for you! 💭",
  searching: "Scanning university database & course catalog... 🔍",
  typing: "Formulating your answer... ✍️",
  answering: "Here is what I found! 🎓",
  excited: "Awesome question! Let me share all details! 🌟",
  confused: "Hmm, I'm not quite sure about that query... 🤔",
  success: "Got it! Hope this helps! 💜",
  error: "Hmm, something went wrong. Let's try again! 😅",
  goodbye: "See you around campus! Have a great day! 👋"
};

export function useSUAiState(initialState = SUAi_STATES.IDLE) {
  const [suaiState, setSuaiState] = useState(initialState);
  const [speechBubbleText, setSpeechBubbleText] = useState(DEFAULT_SPEECH[initialState]);
  const [isProcessing, setIsProcessing] = useState(false);

  const changeState = useCallback((newState, customSpeech) => {
    setSuaiState(newState);
    setSpeechBubbleText(customSpeech || DEFAULT_SPEECH[newState] || DEFAULT_SPEECH.idle);
  }, []);

  /**
   * Frontend Simulation Pipeline:
   * IDLE -> THINKING (0-500ms) -> SEARCHING (500-1300ms) -> ANSWERING -> IDLE
   * ZERO network calls, ZERO tokens.
   */
  const processQuery = useCallback(async (queryText, onMessageAdd) => {
    if (!queryText || !queryText.trim() || isProcessing) return;
    
    const userQuery = queryText.trim();
    setIsProcessing(true);

    // Render User Message in stream
    if (onMessageAdd) {
      onMessageAdd({ text: userQuery, sender: 'user' });
    }

    // Step 1: Thinking State (0 - 500ms)
    changeState(SUAi_STATES.THINKING, "SUAi is thinking... 💭");
    await new Promise(r => setTimeout(r, 500));

    // Step 2: Searching State (500 - 1300ms)
    changeState(SUAi_STATES.SEARCHING, "Scanning university records & catalog... 🔍");
    await new Promise(r => setTimeout(r, 800));

    // Step 3: Local Mock Lookup (ZERO API Calls)
    const mockReply = getLocalMockReply(userQuery);

    // Step 4: Typing State (1300 - 1800ms)
    changeState(SUAi_STATES.TYPING, "Formulating answer... ✍️");
    await new Promise(r => setTimeout(r, 500));

    // Step 5: Render Answer & Answering State
    changeState(mockReply.state || SUAi_STATES.ANSWERING, mockReply.speech);
    if (onMessageAdd) {
      onMessageAdd({ text: mockReply.text, sender: 'bot', state: mockReply.state });
    }

    setIsProcessing(false);

    // Return to Idle state after delay
    setTimeout(() => {
      setSuaiState(SUAi_STATES.IDLE);
      setSpeechBubbleText(DEFAULT_SPEECH.idle);
    }, 4000);
  }, [isProcessing, changeState]);

  return {
    suaiState,
    speechBubbleText,
    isProcessing,
    changeState,
    processQuery
  };
}
