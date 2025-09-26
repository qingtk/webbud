# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Webbud is a curated collection of elite web pages and front-end demonstrations, functioning as a web gallery showcasing various HTML, CSS, and JavaScript techniques. The project serves as both a learning resource and a showcase of creative web development examples.

**Live Site**: https://qing.tk/webbud

## Repository Structure

This repository contains over 80 individual web demonstration projects, each in its own numbered directory. The structure follows this pattern:

- **Numbered directories (1-518+)**: Each contains a standalone web demonstration
- **`index.html`**: Main navigation page listing all demos with links
- **`stylesheets/`**: Global stylesheets for the main index page
- **`templates/`**: Reusable HTML templates and assets
- **`assets/`**: Shared assets like backgrounds and icons
- **`javascripts/`**: Global JavaScript utilities

### Demo Project Types

The collection includes diverse categories of web demonstrations:

- **Basic HTML/CSS**: Fundamental techniques and layouts
- **Animation demos**: CSS and JavaScript animations (100-matrix-code-rain, 106-animated-mondrian-css-grid)
- **Interactive components**: Menus, carousels, editors (4-simple-radial-menu, 14-htmleditor)
- **Framework examples**: React (115-react-demo), Vue (514-fast-learn-vue), AngularJS (28-angularjs-htmleditor)
- **Advanced techniques**: Grid layouts (36-grid-layout), WebWorkers (35-webworker), WebTorrent (512-webtorrent-video)
- **Mathematical visualization**: MathJax demos (103-mathjax-demos), Fractals (517-fractal)
- **Modern APIs**: Speech-to-text (511-speech-to-text), Text-to-speech (510-text-to-speech)

### Typical Demo Structure

Most demo directories contain:
```
demo-directory/
├── index.html          # Main demo page
├── style.css           # Demo-specific styles (if needed)
├── script.js           # Demo-specific JavaScript (if needed)
└── assets/             # Demo-specific assets (when present)
```

## Development Commands

### Viewing Demos
```bash
# Open the main gallery page
# Navigate to index.html in browser, or if using a local server:
python -m http.server 8000
# Then visit http://localhost:8000

# For Node.js users
npx serve .
# Then visit http://localhost:3000
```

### Adding New Demos
```bash
# Create a new numbered directory following the existing pattern
mkdir "999-new-demo-name"
cd "999-new-demo-name"

# Create basic structure
touch index.html
# Add your demo content to index.html
```

### Updating the Main Index
After adding a new demo, manually update `index.html` to include a link to the new demonstration in the appropriate section of the navigation list.

### Git Operations
```bash
# Standard git workflow for contributions
git add .
git commit -m "Add demo: descriptive name"
git push origin main

# View recent changes
git --no-pager log --oneline -10

# Check repository status
git status
```

## Architecture Notes

### Self-Contained Demonstrations
Each demo is designed to be completely self-contained, with minimal external dependencies. Most demos use:
- Vanilla HTML/CSS/JavaScript
- CDN-hosted libraries (React, Vue, jQuery, etc.) when frameworks are needed
- Inline or local stylesheets and scripts

### No Build System
This repository intentionally avoids complex build processes. Demonstrations should work directly in browsers without compilation steps, making them accessible for learning and quick experimentation.

### Asset Management
- Global assets shared across demos go in `/assets/` or `/stylesheets/`
- Demo-specific assets should be contained within the demo's directory
- External resources are loaded via CDN to maintain simplicity

### Browser Compatibility
Demos may showcase cutting-edge features and are not necessarily optimized for legacy browser support. The focus is on demonstrating modern web capabilities and techniques.

## Navigation and Discovery

The main `index.html` serves as the central hub, organizing demos into logical groups with separators (----). When adding new demos, consider:
- Placement in appropriate thematic sections
- Descriptive naming that indicates the technique demonstrated
- Multiple entry points for complex demos (e.g., different variations)

## Contributing Guidelines

When adding new demonstrations:
1. Follow the existing numbered directory naming convention
2. Ensure demos are self-contained and work offline when possible
3. Use meaningful, descriptive directory names
4. Add appropriate entries to the main `index.html` navigation
5. Test that demos work across modern browsers
6. Keep external dependencies minimal and use CDN links when needed
