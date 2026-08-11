import React, { useState, useRef, useEffect } from 'react';
import { SUAiHeader } from './SUAiHeader';
import { SUAiWelcome } from './SUAiWelcome';
import { SUAiMessage } from './SUAiMessage';
import { SUAiTypingIndicator } from './SUAiTypingIndicator';
import { useSUAiState } from '../../hooks/useSUAiState';
import { Send } from 'lucide-react';

export function SUAiChatWindow({ onClose, mockMode = true }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { suaiState, speechBubbleText, isProcessing, processQuery, changeState } = useSUAiState('idle');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  const handleSend = () => {
    if (!inputValue.trim() || isProcessing) return;
    const q = inputValue;
    setInputValue('');
    processQuery(q, (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });
  };

  const handleActionSelect = (queryText) => {
    processQuery(queryText, (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });
  };

  const handleReset = () => {
    setMessages([]);
    changeState('idle');
  };

  return (
    <div className="suai-chat-window">
      <SUAiHeader onClose={onClose} onReset={handleReset} />

      <div className="suai-chat-body" ref={chatBodyRef}>
        {messages.length === 0 ? (
          <SUAiWelcome 
            suaiState={suaiState} 
            speechText={speechBubbleText}
            onActionSelect={handleActionSelect}
          />
        ) : (
          <>
            {messages.map((msg, idx) => (
              <SUAiMessage 
                key={idx} 
                text={msg.text} 
                sender={msg.sender} 
              />
            ))}

            {isProcessing && (
              <SUAiTypingIndicator 
                label={
                  suaiState === 'thinking' ? 'SUAi is thinking...' :
                  suaiState === 'searching' ? 'Scanning knowledge base...' :
                  'SUAi is writing reply...'
                } 
              />
            )}
          </>
        )}
      </div>

      <div className="suai-chat-input-area">
        <input 
          type="text" 
          placeholder="Ask SUAi anything about Sharda Agra..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isProcessing}
        />
        <button onClick={handleSend} disabled={isProcessing} title="Send Message">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
