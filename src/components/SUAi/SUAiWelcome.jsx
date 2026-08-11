import React from 'react';
import { SUAiCharacter } from './SUAiCharacter';
import { SUAiQuickActions } from './SUAiQuickActions';

export function SUAiWelcome({ suaiState, speechText, onActionSelect }) {
  return (
    <div className="suai-welcome-box">
      <SUAiCharacter 
        state={suaiState} 
        speechText={speechText} 
        showSpeech={true} 
      />

      <div className="suai-welcome-title">
        What can I help you with today?
      </div>
      <div className="suai-welcome-desc">
        Ask anything about admissions, courses, fees & campus life
      </div>

      <SUAiQuickActions onActionSelect={onActionSelect} />
    </div>
  );
}
