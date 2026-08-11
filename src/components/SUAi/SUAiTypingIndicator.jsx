import React from 'react';
import { SUAiAvatar } from './SUAiAvatar';

export function SUAiTypingIndicator({ label = "SUAi is thinking..." }) {
  return (
    <div className="suai-msg bot" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 14px' }}>
      <SUAiAvatar size={20} showBadge={false} />
      <span style={{ fontSize: '12px', fontWeight: 600, color: '#A78BFA' }}>{label}</span>
      <div style={{ display: 'inline-flex', gap: '4px', marginLeft: '4px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06B6D4', animation: 'suaiDotsBounce 1.4s infinite' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06B6D4', animation: 'suaiDotsBounce 1.4s infinite 0.2s' }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06B6D4', animation: 'suaiDotsBounce 1.4s infinite 0.4s' }} />
      </div>
    </div>
  );
}
