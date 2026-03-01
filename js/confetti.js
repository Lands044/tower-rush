(function () {
  var canvas, ctx, particles = [], animId = null, running = false;

  var COLORS = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
  ];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function stripWidth() {
    // narrower strips on mobile so confetti stays out of popup
    return canvas.width < 480 ? 0.07 : 0.25;
  }

  function randX() {
    var sw = stripWidth();
    return Math.random() < 0.5
      ? rand(0, canvas.width * sw)
      : rand(canvas.width * (1 - sw), canvas.width);
  }

  function createParticle() {
    var maxVx = canvas.width < 480 ? 1.5 : 4;
    return {
      x: randX(),
      y: rand(-20, -120),
      vx: rand(-maxVx, maxVx),
      vy: rand(-2, 3),
      size: rand(6, 14),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      rotation: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.15, 0.15),
      scaleY: 1,
      friction: rand(0.985, 0.995)
    };
  }

  function initParticles(count) {
    particles = [];
    for (var i = 0; i < count; i++) {
      var p = createParticle();
      p.x = randX();
      p.y = rand(-canvas.height, canvas.height * 0.3);
      particles.push(p);
    }
  }

  function update() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.vy += 0.1;
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.scaleY = 0.5 + Math.abs(Math.sin(p.vy * 2)) * 0.5;

      if (p.y > canvas.height || p.x < -20 || p.x > canvas.width + 20) {
        var np = createParticle();
        np.x = randX();
        particles[i] = np;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, p.scaleY);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

  }

  function loop() {
    if (!running) return;
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  function onResize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.startConfetti = function (container) {
    if (!container && window.innerWidth < 768) return;
    if (running) return;

    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      if (container) {
        // inside popup: position absolute to fill the popup
        canvas.style.cssText = [
          'position:absolute',
          'top:0',
          'left:0',
          'width:100%',
          'height:100%',
          'pointer-events:none',
          'z-index:1'
        ].join(';');
        // insert after overlay so it's above the dark bg but below popup__content
        const overlay = container.querySelector('.popup__overlay');
        overlay ? overlay.after(canvas) : container.prepend(canvas);
      } else {
        canvas.style.cssText = [
          'position:fixed',
          'top:0',
          'left:0',
          'width:100%',
          'height:100%',
          'pointer-events:none'
        ].join(';');
        document.body.insertBefore(canvas, document.body.firstChild);
      }
      ctx = canvas.getContext('2d');
      window.addEventListener('resize', onResize);
    }

    onResize();
    running = true;
    initParticles(500);
    loop();
  };

  window.stopConfetti = function () {
    running = false;
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    if (canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
})();
