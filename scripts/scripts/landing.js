// UNIT A9 - Intro Animation Control
document.addEventListener("DOMContentLoaded", () => {
  const beams = document.querySelector(".light-beams");
  const gradient = document.querySelector(".gradient-bg");
  const title = document.querySelector(".title");
  const subtitle = document.querySelector(".subtitle");
  const button = document.getElementById("getStarted");

  // Initial fade-in
  setTimeout(() => {
    gradient.style.opacity = 1;
    beams.style.opacity = 0.5;
    title.style.opacity = 1;
    subtitle.style.opacity = 0.8;
  }, 400);

  // Reveal button with delay
  setTimeout(() => {
    button.classList.add("visible");
  }, 3000);

  // Handle click
  button.addEventListener("click", () => {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "https://unita9.net"; // later link to next phase
    }, 1200);
  });
});
