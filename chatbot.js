import idleImg from './assets/mascot/idle.jpg';
import thinkingImg from './assets/mascot/thinking.jpg';
import celebratingImg from './assets/mascot/celebrating.jpg';
import confusedImg from './assets/mascot/confused.jpg';
import calmImg from './assets/mascot/calm.jpg';
import wavingImg from './assets/mascot/waving.jpg';

/**
 * SUAi Chatbot - UI Prototype
 * Handles the frontend logic, state management, and interactions
 * for the SUAi mascot chatbot widget.
 */

(function () {
  'use strict';

  const SUAiChatbot = {
    state: {
      isOpen: false,
      emotion: 'idle',
      messages: [],
      isTyping: false,
      idleTimer: null
    },
    emotions: {
      idle: idleImg,
      thinking: thinkingImg,
      happy: celebratingImg,
      celebrating: celebratingImg,
      confused: confusedImg,
      calm: calmImg,
      waving: wavingImg
    },
    mockResponses: [
      "I'm still learning! Real AI responses are coming soon. 🚀",
      "That's a great question! My AI brain is being connected soon. Stay tuned! 🧠",
      "I appreciate your curiosity! Full AI responses will be available shortly. ✨",
      "Hmm, I'm not fully set up yet, but I'll be smart very soon! 😄",
      "Great question! Once my AI is connected, I'll be able to help with everything about Sharda University! 🎓"
    ],

    // Elements cache
    elements: {},

    /**
     * Initialize the chatbot
     */
    init: function () {
      this.injectHTML();
      this.cacheElements();
      this.setupEventListeners();
      
      // Initial welcome message
      setTimeout(() => {
        this.addMessage("Hey! 👋 I'm SUAi, your university AI assistant. How can I help you today?", 'bot');
      }, 500);
    },

    /**
     * Inject the chatbot HTML structure into the DOM
     */
    injectHTML: function () {
      const container = document.createElement('div');
      container.id = 'suai-chatbot-container';
      
      container.innerHTML = `
        <!-- Tooltip -->
        <div id="suai-tooltip" role="tooltip">Ask SUAi ✨</div>
        
        <!-- Floating Mascot Button -->
        <button id="suai-mascot-btn" aria-label="Open SUAi chatbot assistant" aria-expanded="false" type="button">
          <img id="suai-mascot-img" src="${this.emotions.idle}" alt="SUAi Mascot" />
        </button>
        
        <!-- Chat Panel -->
        <div id="suai-chat-panel" role="dialog" aria-label="SUAi chatbot" aria-hidden="true">
          <!-- Header -->
          <div id="suai-chat-header">
            <div class="suai-header-avatar">
              <img id="suai-header-img" src="${this.emotions.idle}" alt="SUAi" />
            </div>
            <div class="suai-header-info">
              <span class="suai-header-title">SUAi</span>
              <span class="suai-header-subtitle">
                <span class="suai-status-dot"></span>
                University AI Assistant
              </span>
            </div>
            <div class="suai-header-actions">
              <button id="suai-minimize-btn" aria-label="Minimize chat" type="button">
                <i class="fa fa-minus"></i>
              </button>
              <button id="suai-close-btn" aria-label="Close chat" type="button">
                <i class="fa fa-times"></i>
              </button>
            </div>
          </div>
          
          <!-- Messages -->
          <div id="suai-messages" aria-live="polite" aria-relevant="additions">
            <!-- Messages injected here -->
          </div>
          
          <!-- Quick Actions -->
          <div id="suai-quick-actions">
            <button class="suai-quick-btn" data-action="find" type="button">🔍 Find something</button>
            <button class="suai-quick-btn" data-action="info" type="button">🏛️ University info</button>
            <button class="suai-quick-btn" data-action="academic" type="button">📚 Academic help</button>
            <button class="suai-quick-btn" data-action="explore" type="button">🧭 Just explore</button>
          </div>
          
          <!-- Input -->
          <div id="suai-input-area">
            <input id="suai-input" type="text" placeholder="Ask SUAi something..." autocomplete="off" aria-label="Type your message" />
            <button id="suai-send-btn" aria-label="Send message" type="button">
              <i class="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      `;
      
      document.body.appendChild(container);
    },

    /**
     * Cache DOM elements for quick access
     */
    cacheElements: function () {
      this.elements = {
        container: document.getElementById('suai-chatbot-container'),
        tooltip: document.getElementById('suai-tooltip'),
        mascotBtn: document.getElementById('suai-mascot-btn'),
        mascotImg: document.getElementById('suai-mascot-img'),
        chatPanel: document.getElementById('suai-chat-panel'),
        headerImg: document.getElementById('suai-header-img'),
        minimizeBtn: document.getElementById('suai-minimize-btn'),
        closeBtn: document.getElementById('suai-close-btn'),
        messages: document.getElementById('suai-messages'),
        quickActions: document.getElementById('suai-quick-actions'),
        inputArea: document.getElementById('suai-input-area'),
        input: document.getElementById('suai-input'),
        sendBtn: document.getElementById('suai-send-btn')
      };
    },

    /**
     * Set up all event listeners
     */
    setupEventListeners: function () {
      // Toggle panel
      this.elements.mascotBtn.addEventListener('click', () => this.togglePanel());
      
      // Close/Minimize
      this.elements.closeBtn.addEventListener('click', () => this.closePanel());
      this.elements.minimizeBtn.addEventListener('click', () => this.closePanel());
      
      // Send message
      this.elements.sendBtn.addEventListener('click', () => this.handleSendMessage());
      this.elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSendMessage();
        }
      });
      
      // Quick actions
      const quickBtns = this.elements.quickActions.querySelectorAll('.suai-quick-btn');
      quickBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = e.target.getAttribute('data-action');
          const text = e.target.textContent;
          this.handleQuickAction(action, text);
        });
      });
      
      // Mascot hover effects
      this.elements.mascotBtn.addEventListener('mouseenter', () => {
        if (!this.state.isOpen) {
          this.setEmotion('waving');
          this.elements.mascotBtn.style.transform = 'scale(1.05)';
        }
      });
      
      this.elements.mascotBtn.addEventListener('mouseleave', () => {
        if (!this.state.isOpen) {
          this.setEmotion('idle');
          this.elements.mascotBtn.style.transform = 'scale(1)';
        }
      });
      
      // Keyboard accessibility (Escape key)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.state.isOpen) {
          this.closePanel();
        }
      });
    },

    /**
     * Toggle the chat panel open/closed
     */
    togglePanel: function () {
      if (this.state.isOpen) {
        this.closePanel();
      } else {
        this.openPanel();
      }
    },

    /**
     * Open the chat panel
     */
    openPanel: function () {
      this.state.isOpen = true;
      this.elements.chatPanel.classList.add('suai-panel-open');
      this.elements.mascotBtn.setAttribute('aria-expanded', 'true');
      this.elements.chatPanel.setAttribute('aria-hidden', 'false');
      
      this.setEmotion('happy');
      this.elements.tooltip.style.display = 'none';
      
      setTimeout(() => {
        this.elements.input.focus();
      }, 400);
    },

    /**
     * Close the chat panel
     */
    closePanel: function () {
      this.state.isOpen = false;
      this.elements.chatPanel.classList.remove('suai-panel-open');
      this.elements.mascotBtn.setAttribute('aria-expanded', 'false');
      this.elements.chatPanel.setAttribute('aria-hidden', 'true');
      
      this.setEmotion('idle');
      
      setTimeout(() => {
        this.elements.tooltip.style.display = '';
      }, 1000);
    },

    /**
     * Set the mascot's emotion
     * @param {string} emotion - The emotion state ('idle', 'thinking', 'happy', etc.)
     */
    setEmotion: function (emotion) {
      if (!this.emotions[emotion] || this.state.emotion === emotion) return;
      
      this.state.emotion = emotion;
      const imgSrc = this.emotions[emotion];
      
      // Update both images
      this.elements.mascotImg.src = imgSrc;
      if (this.elements.headerImg) {
        this.elements.headerImg.src = imgSrc;
      }
      
      // Add animation class
      this.elements.mascotImg.classList.add('suai-emotion-change');
      if (this.elements.headerImg) {
        this.elements.headerImg.classList.add('suai-emotion-change');
      }
      
      setTimeout(() => {
        this.elements.mascotImg.classList.remove('suai-emotion-change');
        if (this.elements.headerImg) {
          this.elements.headerImg.classList.remove('suai-emotion-change');
        }
      }, 300);

      // Handle idle timer
      this.resetIdleTimer();
    },

    /**
     * Reset the timer that returns mascot to idle state
     */
    resetIdleTimer: function () {
      if (this.state.idleTimer) {
        clearTimeout(this.state.idleTimer);
      }

      if (this.state.emotion !== 'idle') {
        this.state.idleTimer = setTimeout(() => {
          // Only auto-return to idle if we aren't currently typing/thinking
          if (!this.state.isTyping) {
            this.setEmotion('idle');
          }
        }, 5000);
      }
    },

    /**
     * Add a message to the chat
     * @param {string} text - Message text
     * @param {string} sender - 'bot' or 'user'
     * @param {boolean} skipAnimation - Optional, skip enter animation
     */
    addMessage: function (text, sender, skipAnimation = false) {
      const msgWrapper = document.createElement('div');
      msgWrapper.className = `suai-message-wrapper suai-message-${sender}`;
      
      const msgElement = document.createElement('div');
      msgElement.className = 'suai-message';
      if (!skipAnimation) {
        msgElement.classList.add('suai-animate-in');
      }
      
      let html = '';
      
      if (sender === 'bot') {
        html += `
          <div class="suai-message-avatar">
            <img src="${this.emotions.idle}" alt="SUAi" />
          </div>
          <div class="suai-message-content">${text}</div>
        `;
      } else {
        html += `<div class="suai-message-content">${text}</div>`;
      }
      
      msgElement.innerHTML = html;
      msgWrapper.appendChild(msgElement);
      this.elements.messages.appendChild(msgWrapper);
      
      // Store in state
      this.state.messages.push({ text, sender });
      
      this.scrollToBottom();
    },

    /**
     * Show the typing indicator
     */
    showTypingIndicator: function () {
      this.state.isTyping = true;
      this.setEmotion('thinking');
      
      const typingWrapper = document.createElement('div');
      typingWrapper.id = 'suai-typing-indicator';
      typingWrapper.className = 'suai-message-wrapper suai-message-bot';
      
      typingWrapper.innerHTML = `
        <div class="suai-message suai-animate-in">
          <div class="suai-message-avatar">
            <img src="${this.emotions.thinking}" alt="SUAi thinking" />
          </div>
          <div class="suai-message-content suai-typing-bubble">
            <div class="suai-typing-dot"></div>
            <div class="suai-typing-dot"></div>
            <div class="suai-typing-dot"></div>
          </div>
        </div>
      `;
      
      this.elements.messages.appendChild(typingWrapper);
      this.scrollToBottom();
    },

    /**
     * Hide the typing indicator
     */
    hideTypingIndicator: function () {
      this.state.isTyping = false;
      const indicator = document.getElementById('suai-typing-indicator');
      if (indicator) {
        indicator.remove();
      }
    },

    /**
     * Handle user sending a message
     */
    handleSendMessage: function () {
      const text = this.elements.input.value.trim();
      
      if (!text) return;
      
      this.elements.input.value = '';
      this.addMessage(text, 'user');
      this.elements.quickActions.classList.add('suai-hidden');
      
      this.showTypingIndicator();
      
      // Simulate network request
      // TODO: Replace with real API call
      const delay = Math.floor(Math.random() * 800) + 1200; // 1.2s - 2s
      
      setTimeout(() => {
        this.hideTypingIndicator();
        this.setEmotion('happy');
        
        const randomResponse = this.mockResponses[Math.floor(Math.random() * this.mockResponses.length)];
        this.addMessage(randomResponse, 'bot');
        
        setTimeout(() => {
          this.setEmotion('idle');
        }, 3000);
      }, delay);
    },

    /**
     * Handle quick action button clicks
     * @param {string} action - Action identifier
     * @param {string} text - Button text
     */
    handleQuickAction: function (action, text) {
      this.elements.quickActions.classList.add('suai-hidden');
      this.addMessage(text, 'user');
      
      this.showTypingIndicator();
      
      // TODO: Replace with real API call
      setTimeout(() => {
        this.hideTypingIndicator();
        this.setEmotion('happy');
        
        let response = '';
        switch (action) {
          case 'find':
            response = "I can help you search for programs, faculty, facilities, and more! This feature is coming soon. 🔍";
            break;
          case 'info':
            response = "Sharda University Agra offers 40+ programs across Engineering, Pharmacy, Design, Agriculture, Management and more! Students from 95+ countries study on our beautiful 50+ acre campus. 🏛️";
            break;
          case 'academic':
            response = "I'll be able to help with course details, exam schedules, academic resources, and more once my AI brain is connected! 📚";
            break;
          case 'explore':
            response = "Welcome to Sharda University Agra! Feel free to explore the website. I'll be here if you need anything! 🧭";
            break;
          default:
            response = "I'm here to help!";
        }
        
        this.addMessage(response, 'bot');
        
        setTimeout(() => {
          this.setEmotion('idle');
        }, 3000);
      }, 1000);
    },

    /**
     * Scroll the messages container to the bottom
     */
    scrollToBottom: function () {
      this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SUAiChatbot.init());
  } else {
    SUAiChatbot.init();
  }

})();
