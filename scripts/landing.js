// UNIT A9 - Intro Animation + Pixie Awakening Transition
document.addEventListener("DOMContentLoaded", () => {
  const beams = document.querySelector(".light-beams");
  const gradient = document.querySelector(".gradient-bg");
  const title = document.querySelector(".title");
  const subtitle = document.querySelector(".subtitle");
  const button = document.getElementById("getStarted");

  // --- Fade in intro elements ---
  setTimeout(() => {
    gradient.style.opacity = 1;
    beams.style.opacity = 0.5;
    title.style.opacity = 1;
    subtitle.style.opacity = 0.8;
  }, 400);

  // --- Show Get Started button ---
  setTimeout(() => {
    button.classList.add("visible");
  }, 3000);

  // --- Handle "Get Started" click ---
  button.addEventListener("click", () => {
    document.body.classList.add("fade-out");

    setTimeout(() => {
      // Simulate the awakening
      document.body.classList.remove("fade-out");
      document.getElementById("landing").classList.add("hidden");

      // Reveal the Enclave + Pixie
      const enclave = document.getElementById("enclave");
      enclave.classList.remove("hidden");
      document.body.classList.add("pixie");

      // Add floating Pixie light
      const sparkle = document.createElement("div");
      sparkle.id = "pixie-sparkle";
      document.body.appendChild(sparkle);
    }, 1200);
  });
});
