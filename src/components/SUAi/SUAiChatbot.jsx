import React, { useState } from 'react';
import { SUAiLauncher } from './SUAiLauncher';
import { SUAiChatWindow } from './SUAiChatWindow';
import '../../styles/suai.css';

export function SUAiChatbot({ 
  theme = 'dark', 
  position = 'bottom-right', 
  mockMode = true 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={`suai-chatbot-root theme-${theme} position-${position}`}>
      <SUAiLauncher onClick={toggleChat} isOpen={isOpen} />

      {isOpen && (
        <SUAiChatWindow 
          onClose={() => setIsOpen(false)} 
          mockMode={mockMode} 
        />
      )}
    </div>
  );
}
