import React from 'react';
import { SUAiAvatar } from './SUAiAvatar';
import { RotateCcw, X } from 'lucide-react';

export function SUAiHeader({ onClose, onReset }) {
  return (
    <>
      <div className="suai-chat-header">
        <SUAiAvatar size={42} showBadge={true} />
        <div className="suai-header-info">
          <div className="suai-header-title">
            <span>SUAi</span>
            <span className="suai-header-badge">AI Companion</span>
          </div>
          <div className="suai-header-status">
            <span className="dot-live" /> Online · Sharda University Agra
          </div>
        </div>

        <div className="suai-header-controls">
          {onReset && (
            <button className="suai-icon-btn" onClick={onReset} title="Reset Chat">
              <RotateCcw size={14} />
            </button>
          )}
          {onClose && (
            <button className="suai-icon-btn" onClick={onClose} title="Close">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="suai-slogan-bar">
        ✨ Your University. One Conversation Away.
      </div>
    </>
  );
}
