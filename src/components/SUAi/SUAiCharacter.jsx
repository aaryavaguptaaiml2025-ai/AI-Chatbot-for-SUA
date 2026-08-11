import React from 'react';
import suaiIdle from '../../assets/suai/suai_idle.png';
import suaiGreeting from '../../assets/suai/suai_greeting.png';
import suaiThinking from '../../assets/suai/suai_thinking.png';
import suaiSearching from '../../assets/suai/suai_searching.png';
import suaiTyping from '../../assets/suai/suai_typing.png';
import suaiAnswering from '../../assets/suai/suai_answering.png';
import suaiExcited from '../../assets/suai/suai_excited.png';
import suaiConfused from '../../assets/suai/suai_confused.png';
import suaiSuccess from '../../assets/suai/suai_success.png';

const ASSET_MAP = {
  idle: suaiIdle,
  greeting: suaiGreeting,
  thinking: suaiThinking,
  searching: suaiSearching,
  typing: suaiTyping,
  answering: suaiAnswering,
  excited: suaiExcited,
  confused: suaiConfused,
  success: suaiSuccess,
  error: suaiConfused,
  goodbye: suaiGreeting
};

export function SUAiCharacter({ 
  state = 'idle', 
  speechText = "Hey! 👋 I'm SUAi, your AI companion for Sharda University Agra!",
  showSpeech = true,
  className = ''
}) {
  const currentAsset = ASSET_MAP[state] || ASSET_MAP.idle;

  return (
    <div className={`suai-character-wrapper ${className}`} data-state={state}>
      <div className="suai-character-stage">
        <img 
          src={currentAsset} 
          alt={`SUAi ${state}`} 
          className="suai-character-asset"
        />
      </div>

      {showSpeech && speechText && (
        <div className="suai-speech-box">
          {speechText}
        </div>
      )}
    </div>
  );
}
