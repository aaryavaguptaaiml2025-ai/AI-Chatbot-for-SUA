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
 *
 * Includes canvas-based background removal for JPG mascot assets
 * that lack native alpha transparency.
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
      emotionTimers: [],
      imagesReady: false
    },

    // Raw source URLs (before background removal)
    rawEmotions: {
      idle: idleImg,
      thinking: thinkingImg,
      happy: celebratingImg,
      celebrating: celebratingImg,
      confused: confusedImg,
      calm: calmImg,
      meditating: calmImg,
      waving: wavingImg
    },

    // Processed transparent URLs (populated by preprocessImages)
    emotions: {},

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

    elements: {},

    /**
     * Initialize the chatbot.
     * Preprocesses images, injects HTML, and runs the first-load intro.
     */
    init: async function () {
      await this.preprocessImages();

      this.injectHTML();
      this.cacheElements();
      this.setupEventListeners();

      // Determine if this is first load in the session
      const introPlayed = sessionStorage.getItem('suai-intro-done');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!introPlayed && !prefersReducedMotion) {
        // Hide tooltip during intro
        this.elements.tooltip.style.display = 'none';
        await this.playIntroSequence();
        sessionStorage.setItem('suai-intro-done', '1');
      } else {
        // Skip intro — just show mascot normally
        if (!introPlayed) sessionStorage.setItem('suai-intro-done', '1');
      }

      // Initial welcome message
      setTimeout(() => {
        this.addMessage("Hey! 👋 I'm SUAi, your university AI assistant. How can I help you today?", 'bot');
      }, 500);
    },

    /**
     * First-load mascot introduction animation.
     * Mascot pops in at center, shows speech bubble, holds,
     * then smoothly slides to its bottom-right resting position.
     */
    playIntroSequence: function () {
      return new Promise((resolve) => {
        const btn = this.elements.mascotBtn;
        const btnRect = btn.getBoundingClientRect();

        // Calculate transform to move mascot from its final position to viewport center
        const vpW = window.innerWidth;
        const vpH = window.innerHeight;
        const centerX = vpW / 2 - btnRect.width / 2;
        const centerY = vpH / 2 - btnRect.height / 2;
        const currentX = btnRect.left;
        const currentY = btnRect.top;
        const dx = centerX - currentX;
        const dy = centerY - currentY;

        // Store the translate as a CSS custom property for the keyframe
        btn.style.setProperty('--suai-intro-translate', `translate(${dx}px, ${dy}px)`);

        // Set emotion to waving for the intro
        this._crossfadeMascot(this.emotions.waving);
        this.state.emotion = 'waving';

        // STEP 1: Hide mascot initially
        btn.classList.add('suai-intro-hidden');

        // STEP 2: After short delay, pop in at center (300ms)
        setTimeout(() => {
          btn.classList.remove('suai-intro-hidden');
          btn.classList.add('suai-intro-center');
          btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.6)`;
          btn.style.opacity = '0';

          // Trigger pop animation
          requestAnimationFrame(() => {
            btn.classList.remove('suai-intro-center');
            btn.classList.add('suai-intro-pop');
          });
        }, 400);

        // STEP 3: After pop finishes (~600ms), show speech bubble
        setTimeout(() => {
          this.showIntroBubble(centerX, centerY, btn.offsetWidth);
        }, 1100);

        // STEP 4: Switch to happy emotion mid-intro
        setTimeout(() => {
          this._crossfadeMascot(this.emotions.happy);
          this.state.emotion = 'happy';
        }, 1800);

        // STEP 5: Start slide to final position (after ~2.3s total hold)
        setTimeout(() => {
          // Fade out speech bubble
          this.hideIntroBubble();

          // Prepare for smooth slide
          btn.classList.remove('suai-intro-pop');
          btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.6)`;
          btn.style.opacity = '1';

          requestAnimationFrame(() => {
            btn.classList.add('suai-intro-settle');

            requestAnimationFrame(() => {
              // Slide to final position (transform: none)
              btn.style.transform = 'translate(0, 0) scale(1)';
            });
          });
        }, 2800);

        // STEP 6: Cleanup after slide completes (~900ms transition)
        setTimeout(() => {
          btn.classList.remove('suai-intro-settle');
          btn.style.transform = '';
          btn.style.opacity = '';
          btn.style.removeProperty('--suai-intro-translate');

          // Switch to idle and resume normal behavior
          this._crossfadeMascot(this.emotions.idle);
          this.state.emotion = 'idle';

          // Show tooltip
          this.elements.tooltip.style.display = '';

          resolve();
        }, 3800);
      });
    },

    /**
     * Show the intro speech bubble near the centered mascot.
     */
    showIntroBubble: function (mascotCenterX, mascotCenterY, mascotWidth) {
      const bubble = document.createElement('div');
      bubble.id = 'suai-intro-bubble';
      bubble.innerHTML = `
        <span class="suai-bubble-line">Hey! 👋 I'm SUAi.</span>
        <span class="suai-bubble-line">Your university AI assistant.</span>
      `;
      document.body.appendChild(bubble);

      // Position above the centered mascot
      const bubbleRect = bubble.getBoundingClientRect();
      const left = mascotCenterX + mascotWidth / 2 - bubbleRect.width / 2;
      const top = mascotCenterY - bubbleRect.height - 12;

      bubble.style.left = left + 'px';
      bubble.style.top = top + 'px';

      // Trigger fade-in
      requestAnimationFrame(() => {
        bubble.classList.add('suai-bubble-visible');
      });

      this._introBubble = bubble;
    },

    /**
     * Fade out and remove the intro speech bubble.
     */
    hideIntroBubble: function () {
      const bubble = this._introBubble;
      if (!bubble) return;

      bubble.classList.remove('suai-bubble-visible');
      bubble.classList.add('suai-bubble-fade');

      setTimeout(() => {
        if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
        this._introBubble = null;
      }, 400);
    },

    // ─── Image Preprocessing ─────────────────────────────────

    /**
     * Process all unique mascot images to remove their baked-in
     * white / checkerboard backgrounds using canvas flood-fill.
     * Produces PNG data-URLs with true alpha transparency.
     */
    preprocessImages: async function () {
      // Collect unique source URLs
      const urlToEmotions = new Map();
      for (const [emotion, url] of Object.entries(this.rawEmotions)) {
        if (!urlToEmotions.has(url)) urlToEmotions.set(url, []);
        urlToEmotions.get(url).push(emotion);
      }

      // Process each unique URL once
      const jobs = [];
      for (const [url, emotionKeys] of urlToEmotions) {
        jobs.push(
          this.removeBackground(url).then(transparentUrl => {
            for (const key of emotionKeys) {
              this.emotions[key] = transparentUrl;
            }
          })
        );
      }

      await Promise.all(jobs);
      this.state.imagesReady = true;
    },

    /**
     * Remove the baked-in background from a JPG mascot image.
     *
     * Algorithm: edge-seeded BFS flood-fill.
     *  1. Draw the image onto an off-screen canvas.
     *  2. Seed every edge pixel into a queue.
     *  3. For each queued pixel, if it looks like "background"
     *     (light, low-saturation), set its alpha to 0 and enqueue
     *     its 4-connected neighbours.
     *  4. After the fill, soften the edges by blending alpha on
     *     border pixels for anti-aliasing.
     *  5. Export as a PNG data-URL.
     *
     * @param {string} imgSrc – Source URL of the image.
     * @returns {Promise<string>} Transparent PNG data-URL.
     */
    removeBackground: function (imgSrc) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const w = img.naturalWidth;
            const h = img.naturalHeight;
            canvas.width = w;
            canvas.height = h;

            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, w, h);
            const d = imageData.data; // Uint8ClampedArray [R,G,B,A, ...]
            const total = w * h;

            // ── 1. Classify every pixel ──────────────────────
            // 0 = unknown, 1 = background-like, 2 = foreground
            const flag = new Uint8Array(total);

            for (let i = 0; i < total; i++) {
              const off = i * 4;
              const r = d[off], g = d[off + 1], b = d[off + 2];
              const mn = Math.min(r, g, b);
              const mx = Math.max(r, g, b);

              // A pixel is "background-like" if it is light AND neutral:
              //   • all channels above 170  (catches white + checkerboard grey)
              //   • saturation spread < 35   (excludes beige skin, yellow sparkles)
              if (mn > 170 && mx > 185 && (mx - mn) < 35) {
                flag[i] = 1;
              } else {
                flag[i] = 2;
              }
            }

            // ── 2. BFS flood-fill from every edge pixel ──────
            const removed = new Uint8Array(total); // 1 = made transparent
            const queue = new Int32Array(total);    // pre-allocated queue
            let head = 0, tail = 0;

            const seedIfBg = (idx) => {
              if (flag[idx] === 1 && !removed[idx]) {
                removed[idx] = 1;
                queue[tail++] = idx;
              }
            };

            // Seed top & bottom rows
            for (let x = 0; x < w; x++) {
              seedIfBg(x);             // top row
              seedIfBg((h - 1) * w + x); // bottom row
            }
            // Seed left & right columns
            for (let y = 0; y < h; y++) {
              seedIfBg(y * w);         // left column
              seedIfBg(y * w + w - 1); // right column
            }

            // Process queue
            while (head < tail) {
              const idx = queue[head++];
              const x = idx % w;
              const y = (idx - x) / w;

              // 4-connected neighbours
              if (x > 0)     seedIfBg(idx - 1);
              if (x < w - 1) seedIfBg(idx + 1);
              if (y > 0)     seedIfBg(idx - w);
              if (y < h - 1) seedIfBg(idx + w);
            }

            // ── 3. Apply transparency ────────────────────────
            for (let i = 0; i < total; i++) {
              if (removed[i]) {
                d[i * 4 + 3] = 0; // set alpha to 0
              }
            }

            // ── 4. Anti-alias edges ──────────────────────────
            // For foreground pixels adjacent to removed pixels,
            // soften their alpha so the mascot doesn't have a
            // harsh, jaggy outline.
            for (let i = 0; i < total; i++) {
              if (removed[i]) continue;       // skip background
              const x = i % w;
              const y = (i - x) / w;

              // Count how many of the 8 neighbours were removed
              let bgNeighbours = 0;
              let totalNeighbours = 0;
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  if (dx === 0 && dy === 0) continue;
                  const nx = x + dx, ny = y + dy;
                  if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
                  totalNeighbours++;
                  if (removed[ny * w + nx]) bgNeighbours++;
                }
              }

              if (bgNeighbours > 0 && totalNeighbours > 0) {
                const off = i * 4;
                const r = d[off], g = d[off + 1], b = d[off + 2];
                const mn = Math.min(r, g, b);
                const mx = Math.max(r, g, b);

                // If this edge pixel is itself quite light and neutral,
                // blend it toward transparency to soften the edge.
                if (mn > 140 && (mx - mn) < 45) {
                  const ratio = bgNeighbours / totalNeighbours;
                  const alphaMultiplier = 1 - ratio * 0.7;
                  d[off + 3] = Math.round(d[off + 3] * alphaMultiplier);
                }
              }
            }

            ctx.putImageData(imageData, 0, 0);
            resolve(canvas.toDataURL('image/png'));
          } catch (err) {
            // Canvas processing failed; fall back to raw image
            console.warn('SUAi: background removal failed, using raw image', err);
            resolve(imgSrc);
          }
        };
        img.onerror = () => {
          console.warn('SUAi: could not load image for preprocessing', imgSrc);
          resolve(imgSrc);
        };
        img.src = imgSrc;
      });
    },

    // ─── HTML / DOM ──────────────────────────────────────────

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

      this._mascotActiveSlot = 'a';
      this._headerActiveSlot = 'a';
    },

    // ─── Event Listeners ─────────────────────────────────────

    setupEventListeners: function () {
      this.elements.mascotBtn.addEventListener('click', () => this.togglePanel());
      this.elements.closeBtn.addEventListener('click', () => this.closePanel());
      this.elements.minimizeBtn.addEventListener('click', () => this.closePanel());

      this.elements.sendBtn.addEventListener('click', () => this.handleSendMessage());
      this.elements.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSendMessage();
      });

      const quickBtns = this.elements.quickActions.querySelectorAll('.suai-quick-btn');
      quickBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = e.target.getAttribute('data-action');
          const text = e.target.textContent;
          this.handleQuickAction(action, text);
        });
      });

      // Hover (desktop only)
      this.elements.mascotBtn.addEventListener('mouseenter', () => {
        if (!this.state.isOpen) this.setEmotion('waving');
      });
      this.elements.mascotBtn.addEventListener('mouseleave', () => {
        if (!this.state.isOpen) this.setEmotion('idle');
      });

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.state.isOpen) this.closePanel();
      });
    },

    // ─── Panel Open / Close ──────────────────────────────────

    togglePanel: function () {
      this.state.isOpen ? this.closePanel() : this.openPanel();
    },

    openPanel: function () {
      this.state.isOpen = true;

      this.triggerMascotAnimation('suai-anim-pop');
      this.setEmotion('happy');

      this.elements.chatPanel.classList.add('suai-panel-open');
      this.elements.mascotBtn.setAttribute('aria-expanded', 'true');
      this.elements.chatPanel.setAttribute('aria-hidden', 'false');
      this.elements.tooltip.style.display = 'none';
      this.elements.headerAvatar.classList.add('suai-header-idle');

      setTimeout(() => this.elements.input.focus(), 400);
    },

    closePanel: function () {
      this.state.isOpen = false;

      this.elements.chatPanel.classList.remove('suai-panel-open');
      this.elements.mascotBtn.setAttribute('aria-expanded', 'false');
      this.elements.chatPanel.setAttribute('aria-hidden', 'true');

      this.setEmotion('idle');
      this.elements.headerAvatar.classList.remove('suai-header-idle');

      setTimeout(() => { this.elements.tooltip.style.display = ''; }, 1000);
    },

    // ─── Emotion System ──────────────────────────────────────

    /**
     * Core emotion controller with crossfade transition.
     */
    setEmotion: function (emotion, options = {}) {
      if (!this.emotions[emotion]) return;
      if (this.state.emotion === emotion) return;

      this.state.previousEmotion = this.state.emotion;
      this.state.emotion = emotion;

      const imgSrc = this.emotions[emotion];

      this._crossfadeMascot(imgSrc);
      this._crossfadeHeader(imgSrc);
      this._applyEmotionAnimation(emotion);

      if (options.temporary && options.duration) {
        this.scheduleEmotionReturn(options.returnTo || 'idle', options.duration);
      } else {
        this.resetIdleTimer();
      }
    },

    _crossfadeMascot: function (newSrc) {
      const active = this._mascotActiveSlot;
      const inactive = active === 'a' ? 'b' : 'a';

      const activeImg = active === 'a' ? this.elements.mascotImgA : this.elements.mascotImgB;
      const inactiveImg = inactive === 'a' ? this.elements.mascotImgA : this.elements.mascotImgB;

      inactiveImg.src = newSrc;
      inactiveImg.classList.replace('suai-img-hidden', 'suai-img-visible');
      activeImg.classList.replace('suai-img-visible', 'suai-img-hidden');

      this._mascotActiveSlot = inactive;
    },

    _crossfadeHeader: function (newSrc) {
      if (!this.elements.headerImgA || !this.elements.headerImgB) return;

      const active = this._headerActiveSlot;
      const inactive = active === 'a' ? 'b' : 'a';

      const activeImg = active === 'a' ? this.elements.headerImgA : this.elements.headerImgB;
      const inactiveImg = inactive === 'a' ? this.elements.headerImgA : this.elements.headerImgB;

      inactiveImg.src = newSrc;
      inactiveImg.classList.replace('suai-img-hidden', 'suai-img-visible');
      activeImg.classList.replace('suai-img-visible', 'suai-img-hidden');

      this._headerActiveSlot = inactive;
    },

    _applyEmotionAnimation: function (emotion) {
      const anims = [
        'suai-anim-pop', 'suai-anim-thinking', 'suai-anim-celebrating',
        'suai-anim-confused', 'suai-anim-meditating'
      ];
      anims.forEach(c => this.elements.mascotBtn.classList.remove(c));
      void this.elements.mascotBtn.offsetWidth; // force reflow

      const map = {
        thinking: 'suai-anim-thinking',
        celebrating: 'suai-anim-celebrating',
        confused: 'suai-anim-confused',
        meditating: 'suai-anim-meditating',
        calm: 'suai-anim-meditating',
        happy: 'suai-anim-pop',
        waving: 'suai-anim-pop'
      };
      if (map[emotion]) this.elements.mascotBtn.classList.add(map[emotion]);
    },

    triggerMascotAnimation: function (animClass) {
      this.elements.mascotBtn.classList.remove(animClass);
      void this.elements.mascotBtn.offsetWidth;
      this.elements.mascotBtn.classList.add(animClass);

      const onEnd = () => {
        this.elements.mascotBtn.classList.remove(animClass);
        this.elements.mascotBtn.removeEventListener('animationend', onEnd);
      };
      this.elements.mascotBtn.addEventListener('animationend', onEnd);
    },

    scheduleEmotionReturn: function (returnEmotion, duration) {
      const timer = setTimeout(() => {
        if (!this.state.isTyping) this.setEmotion(returnEmotion);
        const idx = this.state.emotionTimers.indexOf(timer);
        if (idx > -1) this.state.emotionTimers.splice(idx, 1);
      }, duration);
      this.state.emotionTimers.push(timer);
    },

    clearAllEmotionTimers: function () {
      this.state.emotionTimers.forEach(t => clearTimeout(t));
      this.state.emotionTimers = [];
    },

    resetIdleTimer: function () {
      if (this.state.idleTimer) clearTimeout(this.state.idleTimer);
      if (this.state.emotion !== 'idle') {
        this.state.idleTimer = setTimeout(() => {
          if (!this.state.isTyping) this.setEmotion('idle');
        }, 5000);
      }
    },

    // ─── Messages ────────────────────────────────────────────

    addMessage: function (text, sender, skipAnimation = false) {
      const msgWrapper = document.createElement('div');
      msgWrapper.className = `suai-message-wrapper suai-message-${sender}`;

      const msgElement = document.createElement('div');
      msgElement.className = 'suai-message';
      if (!skipAnimation) msgElement.classList.add('suai-animate-in');

      let html = '';
      if (sender === 'bot') {
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
      this.state.messages.push({ text, sender });
      this.scrollToBottom();
    },

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

    hideTypingIndicator: function () {
      this.state.isTyping = false;
      const indicator = document.getElementById('suai-typing-indicator');
      if (indicator) indicator.remove();
    },

    // ─── User Actions ────────────────────────────────────────

    handleSendMessage: function () {
      const text = this.elements.input.value.trim();
      if (!text) return;

      this.elements.input.value = '';
      this.addMessage(text, 'user');
      this.elements.quickActions.classList.add('suai-hidden');
      this.showTypingIndicator();

      const delay = Math.floor(Math.random() * 800) + 1200;
      setTimeout(() => {
        this.hideTypingIndicator();
        this.setEmotion('happy');
        this.triggerMascotAnimation('suai-anim-pop');
        const resp = this.mockResponses[Math.floor(Math.random() * this.mockResponses.length)];
        this.addMessage(resp, 'bot');
        this.scheduleEmotionReturn('idle', 3000);
      }, delay);
    },

    handleQuickAction: function (action, text) {
      this.elements.quickActions.classList.add('suai-hidden');
      this.addMessage(text, 'user');
      this.showTypingIndicator();

      setTimeout(() => {
        this.hideTypingIndicator();

        let response = '';
        let emotionAfter = 'happy';

        switch (action) {
          case 'find':
            response = "I can help you search for programs, faculty, facilities, and more! This feature is coming soon. 🔍";
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

        this.setEmotion(emotionAfter);
        if (emotionAfter === 'celebrating') this.triggerMascotAnimation('suai-anim-celebrating');
        else if (emotionAfter === 'confused') this.triggerMascotAnimation('suai-anim-confused');
        else this.triggerMascotAnimation('suai-anim-pop');

        this.addMessage(response, 'bot');

        const returnDelay = emotionAfter === 'meditating' ? 5000 : 3000;
        const returnTo = this.state.isOpen ? 'happy' : 'idle';
        this.scheduleEmotionReturn(returnTo, returnDelay);

        if (returnTo === 'happy') {
          const idleTimer = setTimeout(() => {
            if (!this.state.isTyping && this.state.emotion === 'happy') this.setEmotion('idle');
          }, returnDelay + 3000);
          this.state.emotionTimers.push(idleTimer);
        }
      }, 1000);
    },

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
