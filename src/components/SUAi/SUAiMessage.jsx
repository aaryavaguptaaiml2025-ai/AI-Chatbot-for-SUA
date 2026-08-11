import React from 'react';
import { SUAiAvatar } from './SUAiAvatar';

export function SUAiMessage({ text, sender = 'bot', time }) {
  const isBot = sender === 'bot';

  const formattedText = text
    .split('\n\n')
    .map((paragraph, idx) => (
      <p key={idx} style={{ margin: idx === 0 ? '0' : '8px 0 0' }}>
        {paragraph.split('\n').map((line, lIdx) => (
          <React.Fragment key={lIdx}>
            {lIdx > 0 && <br />}
            {renderBoldText(line)}
          </React.Fragment>
        ))}
      </p>
    ));

  return (
    <div className={`suai-msg ${isBot ? 'bot' : 'user'}`}>
      {isBot && (
        <div className="suai-msg-header">
          <SUAiAvatar size={20} showBadge={false} />
          <span className="suai-msg-name">SUAi</span>
          {time && <span style={{ fontSize: '10px', color: '#94A3B8', marginLeft: 'auto' }}>{time}</span>}
        </div>
      )}
      <div className="suai-msg-body">
        {formattedText}
      </div>
    </div>
  );
}

function renderBoldText(str) {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
