import React from 'react';
import { SUAiChatbot } from './components/SUAi/SUAiChatbot';

/**
 * Demo App — renders the SUAi Chatbot overlay.
 * In production, <SUAiChatbot /> can be dropped into any page.
 */
export default function App() {
  return (
    <>
      {/* The SUAi Chatbot — ZERO API calls, 100% local mock mode */}
      <SUAiChatbot mockMode={true} position="bottom-right" theme="dark" />
    </>
  );
}
