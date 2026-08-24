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
      previousEmotion: 'idle',
      messages: [],
      isTyping: false,
      idleTimer: null,
      emotionTimers: [],     // stack of emotion timers for cleanup
      imagesPreloaded: false
    },

    emotions: {
      idle: idleImg,
      thinking: thinkingImg,
      happy: celebratingImg,
      celebrating: celebratingImg,
      confused: confusedImg,
      calm: calmImg,
      meditating: calmImg,
      waving: wavingImg
    },

    // Emotion priority: higher = more important
    emotionPriority: {
      idle: 0,
      happy: 1,
      waving: 1,
      thinking: 2,
      celebrating: 2,
      confused: 2,
      meditating: 2,
      calm: 1
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
      this.preloadImages();
      this.injectHTML();
      this.cacheElements();
      this.setupEventListeners();
      
      // Initial welcome message
      setTimeout(() => {
        this.addMessage("Hey! 👋 I'm SUAi, your university AI assistant. How can I help you today?", 'bot');
      }, 500);
    },

    /**
     * Preload all mascot emotion images to avoid loading flash
     */
    preloadImages: function () {
      const urls = Object.values(this.emotions);
      const uniqueUrls = [...new Set(urls)];
      
      uniqueUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
      
      this.state.imagesPreloaded = true;
    },

    /**
     * Inject the chatbot HTML structure into the DOM
     * Uses dual-image crossfade for smooth emotion transitions
     */
    injectHTML: function () {
      const container = document.createElement('div');
      container.id = 'suai-chatbot-container';
      
      container.innerHTML = `
        <!-- Tooltip -->
        <div id="suai-tooltip" role="tooltip">Ask SUAi ✨</div>
        
        <!-- Floating Mascot Button -->
        <button id="suai-mascot-btn" aria-label="Open SUAi chatbot assistant" aria-expanded="false" type="button">
          <div class="suai-mascot-img-wrapper">
            <img id="suai-mascot-img-a" class="suai-img-visible" src="${this.emotions.idle}" alt="SUAi Mascot" />
            <img id="suai-mascot-img-b" class="suai-img-hidden" src="${this.emotions.idle}" alt="SUAi Mascot" />
          </div>
        </button>
        
        <!-- Chat Panel -->
        <div id="suai-chat-panel" role="dialog" aria-label="SUAi chatbot" aria-hidden="true">
          <!-- Header -->
          <div id="suai-chat-header">
            <div class="suai-header-avatar suai-header-idle">
              <img id="suai-header-img-a" class="suai-img-visible" src="${this.emotions.idle}" alt="SUAi" />
              <img id="suai-header-img-b" class="suai-img-hidden" src="${this.emotions.idle}" alt="SUAi" />
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
          
          <!-- Panel Content wrapper for fade-in -->
          <div class="suai-panel-content">
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
        // Dual image crossfade elements
        mascotImgA: document.getElementById('suai-mascot-img-a'),
        mascotImgB: document.getElementById('suai-mascot-img-b'),
        chatPanel: document.getElementById('suai-chat-panel'),
        headerAvatar: document.querySelector('.suai-header-avatar'),
        headerImgA: document.getElementById('suai-header-img-a'),
        headerImgB: document.getElementById('suai-header-img-b'),
        minimizeBtn: document.getElementById('suai-minimize-btn'),
        closeBtn: document.getElementById('suai-close-btn'),
        messages: document.getElementById('suai-messages'),
        quickActions: document.getElementById('suai-quick-actions'),
        inputArea: document.getElementById('suai-input-area'),
        input: document.getElementById('suai-input'),
        sendBtn: document.getElementById('suai-send-btn')
      };
      
      // Track which img element is currently visible (A/B toggle for crossfade)
      this._mascotActiveSlot = 'a';
      this._headerActiveSlot = 'a';
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
      
      // Mascot hover effects (desktop only)
      this.elements.mascotBtn.addEventListener('mouseenter', () => {
        if (!this.state.isOpen) {
          this.setEmotion('waving');
        }
      });
      
      this.elements.mascotBtn.addEventListener('mouseleave', () => {
        if (!this.state.isOpen) {
          this.setEmotion('idle');
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
     * Open the chat panel with connected transition:
     * mascot pop → panel expands → content fades in
     */
    openPanel: function () {
      this.state.isOpen = true;
      
      // 1. Mascot pop animation
      this.triggerMascotAnimation('suai-anim-pop');
      
      // 2. Change emotion to happy
      this.setEmotion('happy');
      
      // 3. Open panel (CSS transition handles scale+opacity)
      this.elements.chatPanel.classList.add('suai-panel-open');
      this.elements.mascotBtn.setAttribute('aria-expanded', 'true');
      this.elements.chatPanel.setAttribute('aria-hidden', 'false');
      
      // 4. Hide tooltip
      this.elements.tooltip.style.display = 'none';
      
      // 5. Enable header idle animation
      this.elements.headerAvatar.classList.add('suai-header-idle');
      
      // 6. Focus input after animation
      setTimeout(() => {
        this.elements.input.focus();
      }, 400);
    },

    /**
     * Close the chat panel with collapse-back transition:
     * content fades → panel shrinks → mascot returns to idle floating
     */
    closePanel: function () {
      this.state.isOpen = false;
      
      // 1. Remove panel open class (triggers close transition)
      this.elements.chatPanel.classList.remove('suai-panel-open');
      this.elements.mascotBtn.setAttribute('aria-expanded', 'false');
      this.elements.chatPanel.setAttribute('aria-hidden', 'true');
      
      // 2. Return to idle
      this.setEmotion('idle');
      
      // 3. Stop header idle animation
      this.elements.headerAvatar.classList.remove('suai-header-idle');
      
      // 4. Show tooltip after delay
      setTimeout(() => {
        this.elements.tooltip.style.display = '';
      }, 1000);
    },

    /**
     * Core emotion controller with crossfade transition and conflict prevention.
     * Manages dual-image crossfade for smooth transitions.
     * @param {string} emotion - The emotion state
     * @param {object} options - Optional config { temporary: bool, duration: number, returnTo: string }
     */
    setEmotion: function (emotion, options = {}) {
      if (!this.emotions[emotion]) return;
      if (this.state.emotion === emotion) return;
      
      this.state.previousEmotion = this.state.emotion;
      this.state.emotion = emotion;
      
      const imgSrc = this.emotions[emotion];
      
      // Crossfade mascot button images
      this._crossfadeMascot(imgSrc);
      
      // Crossfade header images
      this._crossfadeHeader(imgSrc);
      
      // Apply emotion-specific animation to the mascot button
      this._applyEmotionAnimation(emotion);
      
      // Handle temporary emotions
      if (options.temporary && options.duration) {
        const returnEmotion = options.returnTo || 'idle';
        this.scheduleEmotionReturn(returnEmotion, options.duration);
      } else {
        // Handle idle timer for non-idle emotions
        this.resetIdleTimer();
      }
    },

    /**
     * Crossfade between mascot button images (A/B swap)
     * @param {string} newSrc - New image URL
     */
    _crossfadeMascot: function (newSrc) {
      const activeSlot = this._mascotActiveSlot;
      const inactiveSlot = activeSlot === 'a' ? 'b' : 'a';
      
      const activeImg = activeSlot === 'a' ? this.elements.mascotImgA : this.elements.mascotImgB;
      const inactiveImg = inactiveSlot === 'a' ? this.elements.mascotImgA : this.elements.mascotImgB;
      
      // Set new image on inactive slot
      inactiveImg.src = newSrc;
      
      // Crossfade: show inactive, hide active
      inactiveImg.classList.remove('suai-img-hidden');
      inactiveImg.classList.add('suai-img-visible');
      activeImg.classList.remove('suai-img-visible');
      activeImg.classList.add('suai-img-hidden');
      
      // Swap active tracker
      this._mascotActiveSlot = inactiveSlot;
    },

    /**
     * Crossfade between header avatar images (A/B swap)
     * @param {string} newSrc - New image URL
     */
    _crossfadeHeader: function (newSrc) {
      if (!this.elements.headerImgA || !this.elements.headerImgB) return;
      
      const activeSlot = this._headerActiveSlot;
      const inactiveSlot = activeSlot === 'a' ? 'b' : 'a';
      
      const activeImg = activeSlot === 'a' ? this.elements.headerImgA : this.elements.headerImgB;
      const inactiveImg = inactiveSlot === 'a' ? this.elements.headerImgA : this.elements.headerImgB;
      
      // Set new image on inactive slot
      inactiveImg.src = newSrc;
      
      // Crossfade
      inactiveImg.classList.remove('suai-img-hidden');
      inactiveImg.classList.add('suai-img-visible');
      activeImg.classList.remove('suai-img-visible');
      activeImg.classList.add('suai-img-hidden');
      
      this._headerActiveSlot = inactiveSlot;
    },

    /**
     * Apply emotion-specific CSS animation class to the mascot button
     * @param {string} emotion - Current emotion
     */
    _applyEmotionAnimation: function (emotion) {
      // Remove all emotion animation classes first
      const animClasses = [
        'suai-anim-pop', 'suai-anim-thinking', 'suai-anim-celebrating',
        'suai-anim-confused', 'suai-anim-meditating'
      ];
      animClasses.forEach(cls => this.elements.mascotBtn.classList.remove(cls));
      
      // Force reflow so re-adding same class triggers animation
      void this.elements.mascotBtn.offsetWidth;
      
      switch (emotion) {
        case 'thinking':
          this.elements.mascotBtn.classList.add('suai-anim-thinking');
          break;
        case 'celebrating':
          this.elements.mascotBtn.classList.add('suai-anim-celebrating');
          break;
        case 'confused':
          this.elements.mascotBtn.classList.add('suai-anim-confused');
          break;
        case 'meditating':
        case 'calm':
          this.elements.mascotBtn.classList.add('suai-anim-meditating');
          break;
        case 'happy':
        case 'waving':
          // Small pop for happy/waving transitions
          this.elements.mascotBtn.classList.add('suai-anim-pop');
          break;
      }
    },

    /**
     * Trigger a one-shot animation class on the mascot button
     * @param {string} animClass - CSS animation class name
     */
    triggerMascotAnimation: function (animClass) {
      this.elements.mascotBtn.classList.remove(animClass);
      void this.elements.mascotBtn.offsetWidth; // Force reflow
      this.elements.mascotBtn.classList.add(animClass);
      
      // Clean up after animation
      const onEnd = () => {
        this.elements.mascotBtn.classList.remove(animClass);
        this.elements.mascotBtn.removeEventListener('animationend', onEnd);
      };
      this.elements.mascotBtn.addEventListener('animationend', onEnd);
    },

    /**
     * Schedule an emotion return after a temporary emotion
     * Cleans up any existing timers to prevent conflicts
     * @param {string} returnEmotion - Emotion to return to
     * @param {number} duration - Duration in ms
     */
    scheduleEmotionReturn: function (returnEmotion, duration) {
      const timer = setTimeout(() => {
        // Only return if we haven't been overridden by a higher-priority emotion
        if (!this.state.isTyping) {
          this.setEmotion(returnEmotion);
        }
        // Remove this timer from tracking array
        const idx = this.state.emotionTimers.indexOf(timer);
        if (idx > -1) this.state.emotionTimers.splice(idx, 1);
      }, duration);
      
      this.state.emotionTimers.push(timer);
    },

    /**
     * Clear all pending emotion timers (conflict prevention)
     */
    clearAllEmotionTimers: function () {
      this.state.emotionTimers.forEach(t => clearTimeout(t));
      this.state.emotionTimers = [];
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
        // Use current emotion for bot message avatar
        const avatarSrc = this.emotions[this.state.emotion] || this.emotions.idle;
        html += `
          <div class="suai-message-avatar">
            <img src="${avatarSrc}" alt="SUAi" />
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
      this.clearAllEmotionTimers();
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
        
        // Transition: thinking → happy with pop
        this.setEmotion('happy');
        this.triggerMascotAnimation('suai-anim-pop');
        
        const randomResponse = this.mockResponses[Math.floor(Math.random() * this.mockResponses.length)];
        this.addMessage(randomResponse, 'bot');
        
        // Return to idle after 3s
        this.scheduleEmotionReturn('idle', 3000);
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
        
        let response = '';
        let emotionAfter = 'happy';
        
        switch (action) {
          case 'find':
            response = "I can help you search for programs, faculty, facilities, and more! This feature is coming soon. 🔍";
            // "coming soon" = confused
            emotionAfter = 'confused';
            break;
          case 'info':
            response = "Sharda University Agra offers 40+ programs across Engineering, Pharmacy, Design, Agriculture, Management and more! Students from 95+ countries study on our beautiful 50+ acre campus. 🏛️";
            emotionAfter = 'celebrating';
            break;
          case 'academic':
            response = "I'll be able to help with course details, exam schedules, academic resources, and more once my AI brain is connected! 📚";
            emotionAfter = 'happy';
            break;
          case 'explore':
            response = "Welcome to Sharda University Agra! Feel free to explore the website. I'll be here if you need anything! 🧭";
            emotionAfter = 'meditating';
            break;
          default:
            response = "I'm here to help!";
        }
        
        // Apply emotion with appropriate animation
        this.setEmotion(emotionAfter);
        
        if (emotionAfter === 'celebrating') {
          this.triggerMascotAnimation('suai-anim-celebrating');
        } else if (emotionAfter === 'confused') {
          this.triggerMascotAnimation('suai-anim-confused');
        } else {
          this.triggerMascotAnimation('suai-anim-pop');
        }
        
        this.addMessage(response, 'bot');
        
        // Determine return behavior based on emotion
        const returnDelay = emotionAfter === 'meditating' ? 5000 : 3000;
        const returnTo = this.state.isOpen ? 'happy' : 'idle';
        
        this.scheduleEmotionReturn(returnTo, returnDelay);
        
        // Then back to idle after another period
        if (returnTo === 'happy') {
          const idleTimer = setTimeout(() => {
            if (!this.state.isTyping && this.state.emotion === 'happy') {
              this.setEmotion('idle');
            }
          }, returnDelay + 3000);
          this.state.emotionTimers.push(idleTimer);
        }
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
