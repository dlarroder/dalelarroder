function n(e) {
  this.phase = 0;
  this.offset = e.offset || 0;
  this.frequency = e.frequency || 0.001;
  this.amplitude = e.amplitude || 1;
}

n.prototype.update = function () {
  this.phase += this.frequency;
  var e = this.offset + Math.sin(this.phase) * this.amplitude;
  return e;
};

n.prototype.value = function () {
  return this.offset + Math.sin(this.phase) * this.amplitude;
};

function Particle() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.life = 1.0;
  this.maxLife = Math.random() * 80 + 40; // 40-120 frames
  this.size = Math.random() * 25 + 15; // 15-40px squares - much larger
  // Sci-fi 8-bit color palette: cyan, electric blue, neon green, purple, magenta
  var colors = [180, 200, 220, 120, 280, 300]; // cyan, blue, electric blue, green, purple, magenta
  this.hue = colors[Math.floor(Math.random() * colors.length)];
  this.brightness = Math.random() * 0.4 + 0.7; // 0.7-1.1 - brighter
  this.glowSize = this.size * (Math.random() * 3 + 2); // 2-5x glow effect - more dramatic
  this.rotation = Math.random() * Math.PI * 2; // random rotation for variety
}

function ParticleSystem() {
  this.particles = [];
  this.maxParticles = 80; // more particles for dramatic effect
  this.spawnRate = 5; // more particles per frame when mouse moves
}

ParticleSystem.prototype.addParticle = function (x, y) {
  if (this.particles.length < this.maxParticles) {
    var particle = new Particle();
    particle.x = x + (Math.random() - 0.5) * 30;
    particle.y = y + (Math.random() - 0.5) * 30;
    // Random explosion in all directions - more dramatic spread
    var angle = Math.random() * Math.PI * 2;
    var speed = Math.random() * 8 + 3; // 3-11 speed
    particle.vx = Math.cos(angle) * speed;
    particle.vy = Math.sin(angle) * speed;
    this.particles.push(particle);
  }
};

ParticleSystem.prototype.update = function () {
  // Add new particles when mouse moves
  if (mouseMoving && this.particles.length < this.maxParticles) {
    for (var j = 0; j < this.spawnRate; j++) {
      this.addParticle(pos.x, pos.y);
    }
  }

  // Update existing particles
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];

    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Apply friction only (no gravity) - particles spread in all directions
    p.vx *= 0.96; // slightly more friction for dramatic slow-down
    p.vy *= 0.96;

    // Update rotation for dynamic effect
    p.rotation += 0.05;

    // Update life
    p.life -= 1.0 / p.maxLife;

    // Remove dead particles
    if (p.life <= 0) {
      this.particles.splice(i, 1);
    }
  }
};

ParticleSystem.prototype.draw = function () {
  ctx.globalCompositeOperation = 'lighter';

  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    var alpha = p.life * p.brightness;

    if (alpha > 0) {
      // Draw outer glow effect - more dramatic
      ctx.globalAlpha = alpha * 0.2;
      ctx.fillStyle = 'hsla(' + p.hue + ', 100%, 50%, ' + alpha * 0.2 + ')';
      ctx.fillRect(p.x - p.glowSize / 2, p.y - p.glowSize / 2, p.glowSize, p.glowSize);

      // Draw middle glow
      ctx.globalAlpha = alpha * 0.4;
      ctx.fillStyle = 'hsla(' + p.hue + ', 95%, 60%, ' + alpha * 0.4 + ')';
      var midGlow = p.glowSize * 0.6;
      ctx.fillRect(p.x - midGlow / 2, p.y - midGlow / 2, midGlow, midGlow);

      // Draw main particle (pixelated square) - more saturated sci-fi colors
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'hsla(' + p.hue + ', 100%, 75%, ' + alpha + ')';
      ctx.fillRect(
        Math.floor(p.x - p.size / 2),
        Math.floor(p.y - p.size / 2),
        Math.floor(p.size),
        Math.floor(p.size)
      );

      // Add ultra-bright center for intense 8-bit sci-fi effect
      ctx.globalAlpha = alpha * 0.9;
      ctx.fillStyle = 'hsla(' + p.hue + ', 100%, 95%, ' + alpha * 0.9 + ')';
      var centerSize = Math.max(2, Math.floor(p.size * 0.3));
      ctx.fillRect(
        Math.floor(p.x - centerSize / 2),
        Math.floor(p.y - centerSize / 2),
        centerSize,
        centerSize
      );

      // Add small white core for extra intensity
      ctx.globalAlpha = alpha * 0.6;
      ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha * 0.6 + ')';
      var coreSize = Math.max(1, Math.floor(p.size * 0.15));
      ctx.fillRect(
        Math.floor(p.x - coreSize / 2),
        Math.floor(p.y - coreSize / 2),
        coreSize,
        coreSize
      );
    }
  }

  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
};

function onMousemove(e) {
  var newX = e.clientX || (e.touches && e.touches[0].clientX);
  var newY = e.clientY || (e.touches && e.touches[0].clientY);

  // Check if mouse actually moved
  mouseMoving = Math.abs(newX - lastMousePos.x) > 2 || Math.abs(newY - lastMousePos.y) > 2;

  pos.x = newX;
  pos.y = newY;
  lastMousePos.x = newX;
  lastMousePos.y = newY;
}

function onTouchMove(e) {
  if (e.touches.length == 1) {
    var newX = e.touches[0].pageX;
    var newY = e.touches[0].pageY;
    mouseMoving = Math.abs(newX - lastMousePos.x) > 2 || Math.abs(newY - lastMousePos.y) > 2;
    pos.x = newX;
    pos.y = newY;
    lastMousePos.x = newX;
    lastMousePos.y = newY;
    e.preventDefault();
  }
}

function onTouchStart(e) {
  if (e.touches.length == 1) {
    pos.x = e.touches[0].pageX;
    pos.y = e.touches[0].pageY;
    lastMousePos.x = pos.x;
    lastMousePos.y = pos.y;
    e.preventDefault();
  }
}

function render() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Fade mouse movement flag
  if (mouseMoving) {
    setTimeout(function () {
      mouseMoving = false;
    }, 100);
  }

  particleSystem.update();
  particleSystem.draw();

  ctx.frame++;
  window.requestAnimationFrame(render);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onFocus() {
  if (!ctx.running) {
    ctx.running = true;
    render();
  }
}

function onBlur() {
  ctx.running = false;
}

var canvas,
  ctx,
  pos = {},
  particleSystem = new ParticleSystem(),
  mouseMoving = false,
  lastMousePos = { x: 0, y: 0 };

function initCanvas() {
  canvas = document.getElementById('canvas');
  if (!canvas) return;

  ctx = canvas.getContext('2d');
  ctx.running = true;
  ctx.frame = 1;

  pos.x = canvas.width / 2;
  pos.y = canvas.height / 2;
  lastMousePos.x = pos.x;
  lastMousePos.y = pos.y;

  resizeCanvas();

  document.removeEventListener('mousemove', onMousemove);
  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchstart', onTouchStart);
  document.addEventListener('mousemove', onMousemove);
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchstart', onTouchStart);

  render();
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('focus', onFocus);
  window.addEventListener('blur', onBlur);
  window.addEventListener('load', initCanvas);
}

// Export function for React component
export function renderCanvas() {
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      window.addEventListener('load', initCanvas);
    } else {
      initCanvas();
    }
  }
}
