// UNIT A9 — Scroll Awakening Prototype (Landing Sequence)
console.log("UNIT A9 Scroll prototype initializing...");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const viewportH = window.innerHeight;
  const progress = Math.min(scrollY / viewportH, 1); // 0 → 1 range

  // Light beam intensity
  const beams = document.querySelector(".light-beams");
  if (beams) beams.style.opacity = Math.min(progress * 2, 1);

  // Background fade out slightly as scroll increases
  const bg = document.querySelector(".gradient-bg");
  if (bg) bg.style.opacity = 1 - progress * 0.2;

  // Title scaling and fading
  document.body.style.setProperty("--title-opacity", 1 - progress * 0.5);
  document.body.style.setProperty("--title-scale", 1 + progress * 0.3);

  // Show button near end
  const btn = document.getElementById("enter");
  if (btn) {
    if (progress > 0.95) btn.classList.remove("hidden");
    else btn.classList.add("hidden");
  }
});
