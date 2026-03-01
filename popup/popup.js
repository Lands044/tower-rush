// ── flag: true = custom DOM popup, false = built-in canvas popup ──
const USE_CUSTOM_POPUP = true;

(() => {
  const popup = document.getElementById('custom-popup');
  const ctaBtn = popup.querySelector('.cta-button');

  // Wire CTA button to redirect
  ctaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.stopConfetti?.();
    window.location.assign(window.TARGET_URL);
  });

  // Intercept AudioBufferSourceNode.start to detect popup sound sprite (offset ~36s)
  let confettiStarted = false;
  const origStart = AudioBufferSourceNode.prototype.start;
  AudioBufferSourceNode.prototype.start = function (when, offset, duration) {
    if (!confettiStarted && typeof offset === 'number' && offset >= 35 && offset <= 37) {
      confettiStarted = true;
      window.startConfetti?.(USE_CUSTOM_POPUP ? popup : undefined);
      if (USE_CUSTOM_POPUP) popup.classList.add('show');
    }
    return origStart.apply(this, arguments);
  };

  // If custom popup is on — push pixi canvas behind our overlay
  if (USE_CUSTOM_POPUP) {
    const pixiContainer = document.getElementById('pixi-container');
    pixiContainer.style.position = 'relative';
    pixiContainer.style.zIndex = '0';
  }

  window.doWork = function () {
    window.stopConfetti?.();
    window.location.assign(window.TARGET_URL);
  };
})();
