import React from 'react';
import suaiAvatarAsset from '../../assets/suai/suai_avatar.png';

export function SUAiAvatar({ size = 44, showBadge = true, className = '' }) {
  return (
    <div 
      className={`suai-avatar-container ${className}`} 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img 
        src={suaiAvatarAsset} 
        alt="SUAi Avatar" 
        className="suai-avatar-img"
      />
      {showBadge && <span className="suai-avatar-badge" />}
    </div>
  );
}
