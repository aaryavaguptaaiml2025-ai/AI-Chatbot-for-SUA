/**
 * @sua-ai/chatbot — SUAi Official AI Companion Frontend
 * 
 * Reusable React components for the SUAi chatbot experience.
 * ZERO AI/API dependencies. 100% frontend-only in mockMode.
 * 
 * Usage:
 *   import { SUAiChatbot } from '@sua-ai/chatbot';
 *   <SUAiChatbot mockMode={true} position="bottom-right" />
 */

// Main composite component
export { SUAiChatbot } from './components/SUAi/SUAiChatbot';

// Individual reusable components
export { SUAiCharacter } from './components/SUAi/SUAiCharacter';
export { SUAiAvatar } from './components/SUAi/SUAiAvatar';
export { SUAiLauncher } from './components/SUAi/SUAiLauncher';
export { SUAiChatWindow } from './components/SUAi/SUAiChatWindow';
export { SUAiHeader } from './components/SUAi/SUAiHeader';
export { SUAiMessage } from './components/SUAi/SUAiMessage';
export { SUAiTypingIndicator } from './components/SUAi/SUAiTypingIndicator';
export { SUAiQuickActions } from './components/SUAi/SUAiQuickActions';
export { SUAiWelcome } from './components/SUAi/SUAiWelcome';

// Hooks
export { useSUAiState, SUAi_STATES, DEFAULT_SPEECH } from './hooks/useSUAiState';

// Mock data (for testing / development)
export { mockResponses, getLocalMockReply } from './mock/mockResponses';
