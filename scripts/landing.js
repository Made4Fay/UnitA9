// ========================================
// UNIT A9 - Scroll-Driven Landing Page
// ========================================

let scrollY = 0;
let lastScrollY = 0;
let scrollVelocity = 0;
let ticking = false;

// ========================================
// Orbital Grid Canvas
// ========================================

function initOrbitalGrid() {
  const canvas = document.getElementById('orbital-grid');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const gridSize = 60;

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(126, 200, 255, 0.15)';
    ctx.lineWidth = 0.5;

    // Draw perspective grid
    for (let x = -canvas.width; x < canvas.width * 2; x += gridSize) {
      ctx.beginPath();
      const offset = (scrollY * 0.3) % gridSize;
      ctx.moveTo(x, -offset);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();
    }

    for (let y = -canvas.height; y < canvas.height * 2; y += gridSize) {
      ctx.beginPath();
      const offset = (scrollY * 0.3) % gridSize;
      ctx.moveTo(-offset, y);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();
    }

    // Draw concentric circles
    ctx.strokeStyle = 'rgba(183, 170, 255, 0.1)';
    for (let r = 50; r < Math.max(canvas.width, canvas.height); r += 100) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r + (scrollY * 0.1) % 100, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  drawGrid();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGrid();
  });

  return drawGrid;
}

// ========================================
// Pixie Field - Dynamic Particles
// ========================================

function initPixieField() {
  const field = document.getElementById('pixie-field');
  if (!field) return;

  const pixies = [];
  const pixieCount = 50;

  for (let i = 0; i < pixieCount; i++) {
    const pixie = document.createElement('div');
    pixie.className = 'pixie';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const z = Math.random() * 200 - 100;
    const duration = 15 + Math.random() * 15;
    const delay = Math.random() * 10;
    
    pixie.style.left = `${x}%`;
    pixie.style.top = `${y}%`;
    pixie.style.setProperty('--dx', `${(Math.random() - 0.5) * 200}px`);
    pixie.style.setProperty('--dy', `${(Math.random() - 0.5) * 200}px`);
    pixie.style.setProperty('--dz', `${z}px`);
    pixie.style.animation = `drift ${duration}s linear infinite`;
    pixie.style.animationDelay = `-${delay}s`;
    
    field.appendChild(pixie);
    pixies.push({ element: pixie, baseX: x, baseY: y, z });
  }

  return pixies;
}

// ========================================
// Logo Particle Burst
// ========================================

function createParticleBurst(x, y, count = 12) {
  const landing = document.querySelector('.scroll-landing');
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'logo-particle';
    
    const angle = (Math.PI * 2 * i) / count;
    const velocity = 80 + Math.random() * 40;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);
    
    landing.appendChild(particle);
    
    setTimeout(() => particle.remove(), 3000);
  }
}

// ========================================
// Scroll-Driven Animations
// ========================================

function updateScrollEffects() {
  const scrollProgress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1);
  const viewportHeight = window.innerHeight;
  
  // Update scroll velocity
  scrollVelocity = scrollY - lastScrollY;
  lastScrollY = scrollY;

  // ========================================
  // Hero Section Effects
  // ========================================

  const landing = document.querySelector('.scroll-landing');
  const centerContent = document.querySelector('.center-content');
  const logo = document.getElementById('ua9-logo');
  const title = document.querySelector('.title');
  const subtitle = document.querySelector('.subtitle');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (landing && centerContent) {
    // 3D perspective transform based on scroll
    const rotateX = Math.min(scrollProgress * 30, 30);
    const translateZ = scrollProgress * -200;
    landing.style.transform = `perspective(1200px) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;

    // Fade out center content
    const fadeStart = 0.15;
    const fadeEnd = 0.4;
    const fadeProgress = Math.max(0, Math.min(1, (scrollProgress - fadeStart) / (fadeEnd - fadeStart)));
    const opacity = 1 - fadeProgress;
    const scale = 1 - (fadeProgress * 0.3);
    const translateY = fadeProgress * -100;

    if (centerContent) {
      centerContent.style.opacity = opacity;
      centerContent.style.transform = `translateZ(0) scale(${scale}) translateY(${translateY}px)`;
    }

    // Logo rotation and scale
    if (logo) {
      const rotation = scrollProgress * 180;
      const logoScale = 1 + (scrollProgress * 0.5);
      logo.style.transform = `rotate(${rotation}deg) scale(${logoScale})`;
    }

    // Hide scroll indicator
    if (scrollIndicator) {
      scrollIndicator.style.opacity = Math.max(0, 1 - (scrollProgress * 5));
    }
  }

  // ========================================
  // Nebula Layers Parallax
  // ========================================

  const nebulaLayers = document.querySelectorAll('.nebula-bg');
  nebulaLayers.forEach((layer, index) => {
    const speed = (index + 1) * 0.15;
    const yOffset = scrollY * speed;
    const baseZ = [-300, -200, -100][index] || -200;
    const scale = [1.5, 1.3, 1.15][index] || 1.2;
    layer.style.transform = `translateZ(${baseZ}px) scale(${scale}) translateY(${yOffset}px)`;
  });

  // ========================================
  // Sacred Geometry Reveal
  // ========================================

  const sacredGeometry = document.querySelector('.sacred-geometry');
  if (sacredGeometry) {
    const revealStart = 0.1;
    const revealEnd = 0.4;
    const geomProgress = Math.max(0, Math.min(1, (scrollProgress - revealStart) / (revealEnd - revealStart)));
    sacredGeometry.style.opacity = geomProgress * 0.6;
    sacredGeometry.style.transform = `translateZ(-80px) scale(${1.2 - geomProgress * 0.2}) rotate(${geomProgress * 45}deg)`;
  }

  // ========================================
  // Energy Beams
  // ========================================

  const energyBeams = document.querySelector('.energy-beams');
  if (energyBeams) {
    const beamStart = 0.2;
    const beamEnd = 0.5;
    const beamProgress = Math.max(0, Math.min(1, (scrollProgress - beamStart) / (beamEnd - beamStart)));
    energyBeams.style.opacity = beamProgress * 0.8;
  }

  // ========================================
  // Orbital Grid Opacity
  // ========================================

  const orbitalGrid = document.getElementById('orbital-grid');
  if (orbitalGrid) {
    const gridOpacity = 0.15 + (scrollProgress * 0.15);
    orbitalGrid.style.opacity = Math.min(gridOpacity, 0.3);
  }

  // ========================================
  // Floating Orbs Parallax
  // ========================================

  const orbs = document.querySelectorAll('.orb');
  orbs.forEach((orb, index) => {
    const speed = 0.3 + (index * 0.1);
    const yOffset = scrollY * speed;
    const velocityEffect = scrollVelocity * (index + 1) * 0.5;
    orb.style.transform = `translateY(${yOffset}px) translateX(${velocityEffect}px)`;
  });

  // ========================================
  // Pixie Field Velocity Response
  // ========================================

  const pixies = document.querySelectorAll('.pixie');
  pixies.forEach((pixie, index) => {
    const velocityInfluence = Math.min(Math.max(scrollVelocity * 0.3, -20), 20);
    const pixieData = pixie.dataset.velocityOffset || '0';
    const smoothedOffset = parseFloat(pixieData) * 0.9 + velocityInfluence * 0.1;
    pixie.dataset.velocityOffset = smoothedOffset.toString();
    pixie.style.setProperty('--velocity-y', `${smoothedOffset}px`);
  });

  // ========================================
  // Journey Section - Singularity
  // ========================================

  const singularity = document.querySelector('.singularity-container');
  if (singularity) {
    const singularityTop = singularity.getBoundingClientRect().top;
    const singularityProgress = Math.max(0, Math.min(1, 1 - (singularityTop / viewportHeight)));
    
    if (singularityProgress > 0) {
      const scale = 0.8 + (singularityProgress * 0.4);
      const opacity = singularityProgress;
      const translateY = (1 - singularityProgress) * 50;
      singularity.style.opacity = opacity;
      singularity.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    }
  }

  // ========================================
  // Geometry Accent
  // ========================================

  const geometryAccent = document.querySelector('.geometry-accent');
  if (geometryAccent) {
    const accentTop = geometryAccent.getBoundingClientRect().top;
    const accentProgress = Math.max(0, Math.min(1, 1 - (accentTop / viewportHeight)));
    
    if (accentProgress > 0) {
      const opacity = accentProgress;
      const translateY = (1 - accentProgress) * 50;
      geometryAccent.style.opacity = opacity;
      geometryAccent.style.transform = `translateY(${translateY}px) rotate(${accentProgress * 45}deg)`;
    }
  }

  // ========================================
  // CTA Section Elements
  // ========================================

  const ctaTitle = document.querySelector('.cta-title');
  const ctaSubtitle = document.querySelector('.cta-subtitle');
  const getStartedBtn = document.querySelector('.get-started-btn');

  if (ctaTitle) {
    const titleTop = ctaTitle.getBoundingClientRect().top;
    const titleProgress = Math.max(0, Math.min(1, 1 - (titleTop / viewportHeight)));
    
    if (titleProgress > 0) {
      ctaTitle.style.opacity = titleProgress;
      ctaTitle.style.transform = `translateY(${(1 - titleProgress) * 30}px)`;
    }
  }

  if (ctaSubtitle) {
    const subtitleTop = ctaSubtitle.getBoundingClientRect().top;
    const subtitleProgress = Math.max(0, Math.min(1, 1 - ((subtitleTop - 50) / viewportHeight)));
    
    if (subtitleProgress > 0) {
      ctaSubtitle.style.opacity = subtitleProgress;
      ctaSubtitle.style.transform = `translateY(${(1 - subtitleProgress) * 30}px)`;
    }
  }

  if (getStartedBtn) {
    const btnTop = getStartedBtn.getBoundingClientRect().top;
    const btnProgress = Math.max(0, Math.min(1, 1 - ((btnTop - 100) / viewportHeight)));
    
    if (btnProgress > 0) {
      const scale = 0.95 + (btnProgress * 0.05);
      getStartedBtn.style.opacity = btnProgress;
      getStartedBtn.style.transform = `translateY(${(1 - btnProgress) * 30}px) scale(${scale})`;
    }
  }

  ticking = false;
}

// ========================================
// Optimized Scroll Handler
// ========================================

function onScroll() {
  scrollY = window.pageYOffset || document.documentElement.scrollTop;
  
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollEffects();
      if (drawGrid) drawGrid();
    });
    ticking = true;
  }
}

// ========================================
// Get Started Button Handler
// ========================================

function initGetStartedButton() {
  const button = document.getElementById('getStarted');
  if (!button) return;

  button.addEventListener('click', () => {
    // Create particle burst effect
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createParticleBurst(x, y, 20);

    // Add fade out animation to body
    document.body.style.transition = 'opacity 1.2s ease';
    document.body.style.opacity = '0';

    // Redirect after animation
    setTimeout(() => {
      window.location.href = 'https://unita9.net';
    }, 1200);
  });

  // Hover effect with particle generation
  button.addEventListener('mouseenter', () => {
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createParticleBurst(x, y, 8);
  });
}

// ========================================
// Mouse Move Parallax (Subtle)
// ========================================

function initMouseParallax() {
  const landing = document.querySelector('.scroll-landing');
  if (!landing) return;

  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

    // Apply subtle parallax to orbs
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
      const depth = (index + 1) * 5;
      orb.style.transform += ` translate3d(${mouseX * depth}px, ${mouseY * depth}px, 0)`;
    });
  });
}

// ========================================
// Initialization
// ========================================

let drawGrid = null;

document.addEventListener('DOMContentLoaded', () => {
  console.log('🌌 UNIT A9 - Initializing...');

  // Initialize all components
  drawGrid = initOrbitalGrid();
  initPixieField();
  initGetStartedButton();
  initMouseParallax();

  // Initial scroll update
  scrollY = window.pageYOffset || document.documentElement.scrollTop;
  lastScrollY = scrollY;
  updateScrollEffects();

  // Attach scroll listener
  window.addEventListener('scroll', onScroll, { passive: true });

  // Handle window resize
  window.addEventListener('resize', () => {
    updateScrollEffects();
  });

  // Initial particle burst on logo after delay
  setTimeout(() => {
    const logo = document.getElementById('ua9-logo');
    if (logo) {
      const rect = logo.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      createParticleBurst(x, y, 16);
    }
  }, 2000);

  console.log('✨ UNIT A9 - Ready');
});

// ========================================
// Smooth Performance Optimization
// ========================================

// Throttle resize events
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (drawGrid) drawGrid();
    updateScrollEffects();
  }, 100);
});
