import React from 'react';
import { SUAiAvatar } from './SUAiAvatar';

export function SUAiLauncher({ onClick, isOpen = false }) {
  return (
    <button 
      className="suai-launcher-btn" 
      onClick={onClick}
      aria-label="Ask SUAi — Your AI Companion"
    >
      <SUAiAvatar size={48} showBadge={false} className="suai-launcher-avatar" />
      <span className="suai-avatar-badge" style={{ top: '-2px', right: '-2px' }} />
      
      <div className="suai-launcher-tooltip">
        <span style={{ color: '#A78BFA' }}>✨</span> Ask SUAi
      </div>
    </button>
  );
}
