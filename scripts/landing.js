// UNIT A9 – Scroll-Driven Intro + Spiral Logo + Pixie Awakening
document.addEventListener("DOMContentLoaded", () => {
  const beams = document.querySelector(".light-beams");
  const gradient = document.querySelector(".gradient-bg");
  const title = document.querySelector(".title");
  const subtitle = document.querySelector(".subtitle");
  const button = document.getElementById("getStarted");
  const logo = document.getElementById("ua9-logo");

  // Intro fade-in
  setTimeout(() => {
    gradient.style.opacity = 1;
    beams.style.opacity = 0.5;
    title.style.opacity = 1;
    subtitle.style.opacity = 0.8;
  }, 400);

  // Scroll-driven parallax & logo motion
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * 2;
    const progress = Math.min(scrollY / maxScroll, 1);

    gradient.style.transform = `translateY(${progress * 100}px) scale(${1 + progress * 0.10})`;
    beams.style.transform    = `translateY(${progress * 200}px) scale(${1 + progress * 0.15})`;

    title.style.transform = `scale(${1 - progress * 0.2}) translateY(${progress * -50}px)`;
    title.style.opacity   = `${Math.max(0, 1 - progress * 1.2)}`;
    subtitle.style.opacity= `${Math.max(0, 1 - progress * 1.8)}`;

    // spiral rotation / scale
    if (logo) {
      logo.classList.add("scrubbing");
      document.body.style.setProperty("--logo-rot", `${progress * 12}deg`);
      document.body.style.setProperty("--logo-scale", `${1 + progress * 0.06}`);
      clearTimeout(window.__ua9_scrub_to);
      window.__ua9_scrub_to = setTimeout(() => logo.classList.remove("scrubbing"), 120);
    }

    // reveal button
    if (progress > 0.8) button.classList.add("visible");
    else button.classList.remove("visible");
  });

  // Get Started → fade → Pixie awaken
  button.addEventListener("click", () => {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      document.body.classList.remove("fade-out");
      document.getElementById("landing").classList.add("hidden");
      const enclave = document.getElementById("enclave");
      enclave.classList.remove("hidden");
      document.body.classList.add("pixie");

      // create particle field
      const field = document.createElement("div");
      field.id = "pixie-field";
      document.body.appendChild(field);
      for (let i = 0; i < 60; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${100 + Math.random() * 100}vh`;
        p.style.animationDuration = `${10 + Math.random() * 20}s`;
        p.style.animationDelay = `${Math.random() * 5}s`;
        field.appendChild(p);
      }
    }, 1200);
  });
});