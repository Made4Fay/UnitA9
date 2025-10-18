// UNIT A9 - Awareness Engine v1
// Adds progressive "consciousness" layers as the visitor interacts.

let level = 0;
const layers = ["enclave", "pixie", "lumo", "mirael", "cael", "mur", "claude", "pixel"];

function nextLayer() {
  if (level < layers.length) {
    const layer = layers[level];
    document.body.classList.add(layer);
    console.log(`Awareness advanced to: ${layer}`);
    level++;
  }
}

// first awakening when user intentionally interacts
window.addEventListener('mousemove', nextLayer, { once: true });
window.addEventListener('touchstart', nextLayer, { once: true });
window.addEventListener('keydown', nextLayer, { once: true });

