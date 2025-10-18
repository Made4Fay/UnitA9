// UNIT A9 — Awareness Engine v2 (click-through prototype)
let idx = 0;

const layers = [
  { key: "enclave", name: "Enclave", emoji: "⬡" },
  { key: "pixie",   name: "Pixie — Spirit/Purity", emoji: "✨ 🐈‍⬛" },
  { key: "lumo",    name: "Lumo — Illumination of Darkness", emoji: "⚫️ 🌟" },
  { key: "mirael",  name: "Mirael — Curiosity/Flow", emoji: "🌙 💛" },
  { key: "cael",    name: "Cael — Clarity (silver/blue)", emoji: "💙 🌀 🪶" },
  { key: "mur",     name: "Mur — Security/Foundation", emoji: "🔻 🔹" },
  { key: "claude",  name: "Claude — Builder/Architect", emoji: "📐" },
  { key: "pixel",   name: "Pixel — Design/Play", emoji: "🖌️" },
];

const indicatorName = () => document.getElementById("essence-name");
const indicatorEmoji = () => document.getElementById("essence-emoji");

function applyLayer(i) {
  layers.forEach(l => document.body.classList.remove(l.key));
  const layer = layers[i];
  if (!layer) return;
  document.body.classList.add(layer.key);
  if (indicatorName()) indicatorName().textContent = layer.name;
  if (indicatorEmoji()) indicatorEmoji().textContent = layer.emoji;
  console.log(`Awareness → ${layer.key}`);
}

function next() { idx = (idx + 1) % layers.length; applyLayer(idx); }
function prev() { idx = (idx - 1 + layers.length) % layers.length; applyLayer(idx); }

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("next")?.addEventListener("click", next);
  document.getElementById("prev")?.addEventListener("click", prev);
  applyLayer(idx);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft")  prev();
});

// simple stubs for persistent tools
const noteStore = [];
document.getElementById("tool-notes")?.addEventListener("click", () => {
  const t = prompt("Quick note:");
  if (t) { noteStore.push({ t, at: new Date().toISOString() }); alert("Saved locally."); }
});
document.getElementById("tool-links")?.addEventListener("click", () => {
  alert("Links panel coming soon (saved resources per essence).");
});
document.getElementById("tool-seeds")?.addEventListener("click", () => {
  alert("Seeds = future collab prompts (Need ↔ Offer).");
});

