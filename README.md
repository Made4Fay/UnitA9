# UNIT A9 Landing Page 🌌

A stunning, scroll-driven landing page featuring cosmic animations, parallax effects, and interactive 3D elements.

## ✨ Features

### Visual Elements
- **Enhanced Orbital Logo** - Multi-layered SVG with rotating orbital rings, glowing nodes, and pulsing effects
- **Sacred Geometry** - Flower of Life and Merkaba patterns that rotate and fade based on scroll position
- **Cosmic Singularity** - Swirling void portal with animated spiral arms
- **Energy Beams** - Vertical light beams that pulse and reveal on scroll
- **Floating Orbs** - Ambient glowing spheres that parallax at different speeds
- **Pixie Particle Field** - 50+ ambient particles drifting through 3D space

### Scroll-Driven Animations
- **3D Perspective Transform** - Hero section rotates in 3D as you scroll
- **Multi-Layer Parallax** - Nebula backgrounds move at different depths
- **Velocity-Based Effects** - Particles react to scroll speed
- **Progressive Reveal** - Elements fade in at different scroll positions
- **Dynamic Scaling** - Logo and graphics transform based on scroll progress

### Interactive Features
- **Mouse Parallax** - Subtle parallax effect following cursor movement
- **Particle Burst** - Exploding particles on button interaction
- **Smooth Transitions** - All animations use requestAnimationFrame for 60fps performance
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 📁 Files

```
unit-a9-landing/
├── index.html      - Main HTML structure with SVG graphics
├── styles.css      - All styles, animations, and responsive design
├── landing.js      - Scroll-driven logic and interactive effects
└── README.md       - This file
```

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `index.html` in a modern web browser. All code is self-contained.

### Option 2: Local Server (Recommended)
For best performance, serve via a local web server:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

### Option 3: GitHub Pages
1. Create a new repository on GitHub
2. Upload all files from `unit-a9-landing/`
3. Enable GitHub Pages in repository settings
4. Your site will be live at: `https://[username].github.io/[repo-name]/`

## 🎨 Customization

### Colors
Edit the color values in `styles.css`:
- `#0a0018` - Deep space background
- `#b7aaff` - Primary purple glow
- `#7ec8ff` - Secondary blue accent
- `#dcd2ff` - Bright highlights

### Scroll Behavior
Adjust scroll-driven animations in `landing.js`:
- `fadeStart` and `fadeEnd` - Control when elements fade
- Parallax speed multipliers - Change depth perception
- `pixieCount` - Number of particle effects

### Get Started Button Link
Change the destination URL in `landing.js`:
```javascript
window.location.href = 'https://unita9.net'; // Change this URL
```

## 🎯 Performance

- **Optimized Rendering** - Uses `requestAnimationFrame` for smooth 60fps
- **Passive Scroll Listeners** - No blocking on scroll events
- **CSS Hardware Acceleration** - `will-change` properties for GPU rendering
- **Throttled Resize** - Debounced window resize handlers
- **Minimal DOM Operations** - Batch updates for efficiency

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android)

## 🎭 Animation Details

### Hero Section (0-40% scroll)
- Logo rotates 180° and scales up
- Content fades out and scales down
- 3D perspective tilt increases
- Sacred geometry fades in and rotates

### Middle Section (40-70% scroll)
- Cosmic singularity scales and reveals
- Geometry accent rotates into view
- Energy beams pulse at full intensity

### CTA Section (70-100% scroll)
- Title, subtitle, and button reveal sequentially
- Get Started button scales and glows
- Particle burst on hover and click

## 🌟 Tips

- **Smooth Scrolling**: Use a mouse wheel or trackpad for best experience
- **Performance**: Close other browser tabs for maximum smoothness
- **Mobile**: Swipe slowly to appreciate the scroll effects
- **Dark Environment**: Best viewed in a dark room for cosmic immersion

## 🔧 Technical Stack

- **Pure HTML5/CSS3/JavaScript** - No frameworks required
- **Canvas API** - Orbital grid rendering
- **SVG** - Vector graphics and filters
- **CSS Grid/Flexbox** - Layout
- **CSS Custom Properties** - Dynamic values
- **requestAnimationFrame** - Smooth animations

## 📝 Notes

- All graphics are procedurally generated (no external images required)
- Font uses Google Fonts (Inter) - will fall back to system fonts
- Designed for modern browsers with CSS3 and ES6+ support
- Optimized for both light and dark mode displays

## 🎨 Design Philosophy

**Unit A9** represents a reflective system of minds - a convergence of consciousness, technology, and cosmic awareness. The visual language uses:

- **Orbital mechanics** - Interconnected systems
- **Sacred geometry** - Universal patterns and harmony
- **Cosmic imagery** - Infinite possibility and depth
- **Light and void** - Balance between known and unknown
- **Particle effects** - Quantum interconnectedness

---

**Made with ✨ by Claude for Unit A9**

*Reflective System of Minds*