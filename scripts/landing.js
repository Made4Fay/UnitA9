document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("ua9-logo");
  const svgPaths = logo.querySelectorAll(".stroke-draw");
  const grid = document.getElementById("orbital-grid");
  const ctx = grid.getContext("2d");
  const body = document.body;
  const landing = document.querySelector(".scroll-landing");

  /* ---------- GRID BACKGROUND ---------- */
  const resize = () => {
    grid.width = window.innerWidth;
    grid.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  function drawGrid(t) {
    ctx.clearRect(0, 0, grid.width, grid.height);
    const cx = grid.width / 2, cy = grid.height / 2;
    ctx.strokeStyle = `rgba(160,180,255,0.2)`;
    ctx.lineWidth = 0.6;
    for (let i = 1; i <= 5; i++) {
      const r = i * 100 + Math.sin(t / 8000 + i) * 20;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    requestAnimationFrame(drawGrid);
  }
  drawGrid(0);

  /* ---------- SCROLL PARALLAX ---------- */
  window.addEventListener("scroll", () => {
    const progress = Math.min(window.scrollY / (window.innerHeight * 2), 1);
    document.querySelector("#orbital-grid").style.transform =
      `translateZ(-200px) scale(${1 + progress * 0.25})`;
    document.querySelector(".nebula-bg").style.transform =
      `translateZ(-400px) scale(${1 + progress * 0.15})`;
    logo.style.transform = `rotate(${progress * 15}deg) scale(${1 + progress * 0.08})`;
  });

  /* ---------- MOUSE CAMERA TILT ---------- */
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * -20;
    landing.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });

  /* ---------- PARTICLE TRAIL ---------- */
  let scrollDir = 1;
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    scrollDir = currentY > lastScrollY ? 1 : -1;
    lastScrollY = currentY;
  });

  function spawnParticle(path, direction) {
    const length = path.getTotalLength();
    const offset = Math.random() * length;
    const point = path.getPointAtLength(direction > 0 ? offset : length - offset);
    const particle = document.createElement("div");
    particle.classList.add("logo-particle");
    const hue = direction > 0 ? 260 : 45;
    particle.style.background = `radial-gradient(circle,
      hsl(${hue},100%,85%) 0%, hsl(${hue + 40},90%,60%) 60%, transparent 100%)`;
    particle.style.left = `${logo.getBoundingClientRect().left + point.x}px`;
    particle.style.top = `${logo.getBoundingClientRect().top + point.y}px`;
    body.appendChild(particle);
    setTimeout(() => particle.remove(), 3000);
  }

  let particleInterval;
  function startTrail() {
    particleInterval = setInterval(() => {
      svgPaths.forEach(path => {
        const speedFactor = Math.min(Math.abs(window.scrollY - lastScrollY) / 40, 4);
        if (Math.random() < 0.25 * (1 + speedFactor)) spawnParticle(path, scrollDir);
      });
    }, 120);
  }
  setTimeout(startTrail, 1000);

  /* ---------- AMBIENT PIXIE FIELD ---------- */
  const pixieField = document.getElementById("pixie-field");
  function createPixies(count = 40) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.classList.add("pixie");
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const z = Math.random() * 400 - 200;
      p.style.left = `${x}vw`;
      p.style.top = `${y}vh`;
      p.style.setProperty("--dx", `${(Math.random() - 0.5) * 200}px`);
      p.style.setProperty("--dy", `${-100 - Math.random() * 200}px`);
      p.style.setProperty("--dz", `${z}px`);
      p.style.animationDuration = `${15 + Math.random() * 20}s`;
      p.style.animationDelay = `${Math.random() * 10}s`;
      pixieField.appendChild(p);
    }
  }
  createPixies();
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * -20;
    pixieField.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  /* ---------- AUDIO HUM ---------- */
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(110, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();

  window.addEventListener("scroll", () => {
    const progress = Math.min(window.scrollY / (window.innerHeight * 2), 1);
    const freq = 110 + progress * 90;
    const vol = 0.015 + progress * 0.025;
    osc.frequency.linearRampToValueAtTime(freq, audioCtx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 0.1);
  });
  document.body.addEventListener("click", () => {
    if (audioCtx.state === "suspended") audioCtx.resume();
  });

  /* ---------- PERFORMANCE OPTIMIZATION ---------- */
  let paused = false;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      paused = true;
      clearInterval(particleInterval);
      gain.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.2);
    } else {
      paused = false;
      startTrail();
      gain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.3);
    }
  });
});