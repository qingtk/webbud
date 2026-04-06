# POLLYGRID

This is POLLYGRID, a customizable HTML website template inspired by my own website's About Section. Its design is loosely inspired by NEEDY STREAMER OVERLOAD and webcore. 
It features draggable grids made possible by the Muuri Library!

## What's Inside?

★ Drag-and-drop grid layout with Muuri.js

★ Taskbar footer and start menu for easy navigation

★ Looks great on everything from phones to desktop

★ Easy color customization with CSS variables

★ Window-style components inspired by webcore

★ Enhanced mobile responsiveness for all screen sizes

★ Flexible grid sizes for all your content needs

★ Clean, modern design with nice shadow effects

★ Helpful tooltips and modal windows

★ Smooth preloader for better loading experience

## Getting Started

It's super easy to get started! Here's what you need to do:

1. First, grab these libraries:
```html
<!-- We need these for all the cool grid functionality -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/muuri/0.9.5/muuri.min.js"></script>
```

2. Copy these files to your project:
- `index.html` (includes preloader and navigation structure)
- `style.css` (comprehensive styling with mobile support)
- `script.js` (grid and preloader functionality)
- `modal.js` (modal window system)

3. Want to make it your own? Check out `style.css` for comprehensive styling options:
```css
:root {
    /* Core Colors */
    --color-background: #f6f6fc;    /* Main page background */
    --color-pattern: #fae9e9;       /* Background pattern overlay */
    --color-container: #e1ecf8;     /* Grid container background */
    --color-header: #fce0ee;        /* Component header background */
    --color-border: #805980;        /* Universal border color */
    --color-shadow: rgba(190, 123, 190, 0.3);  /* Shadow effects */
    --color-text: #333;             /* Primary text color */
    
    /* Navigation Elements */
    --color-taskbar: #e0e0e0;       /* Taskbar background */
    --color-start-menu: #f0f0f0;    /* Start menu background */
    
    /* Mobile Breakpoints */
    --mobile-width: 768px;          /* Mobile layout threshold */
    --small-screen: 480px;          /* Small screen adjustments */
}
```

## Grid Sizes Made Simple

Mix and match these size classes to build your layout:
- `size-full` (spans the whole width)
- `size-half` (takes up half)
- `size-unit` (20% width - great for small widgets)
- `size-two-units` (40% width)
- `size-three-units` (60% width)
- `size-four-units` (80% width)
- `size-square` (perfect square at 40% × 40%)

## Customizing Grid Item Sizes

### Basic Size Classes
To change a grid item's size, simply add one of the size classes to your grid item:

```html
<!-- Full width item -->
<div class="grid-item size-full">
    <!-- Content -->
</div>

<!-- Half width item -->
<div class="grid-item size-half">
    <!-- Content -->
</div>

<!-- Small widget (20% width) -->
<div class="grid-item size-unit">
    <!-- Content -->
</div>
```

### Common Grid Patterns

1. Two equal columns:
```html
<div class="grid-item size-half">Left Column</div>
<div class="grid-item size-half">Right Column</div>
```

2. Main content with sidebar:
```html
<div class="grid-item size-three-units">Main Content (60%)</div>
<div class="grid-item size-two-units">Sidebar (40%)</div>
```

3. Three-column layout:
```html
<div class="grid-item size-unit">Left (20%)</div>
<div class="grid-item size-three-units">Middle (60%)</div>
<div class="grid-item size-unit">Right (20%)</div>
```

### Customizing Sizes in CSS
You can also modify the default sizes in your CSS:

```css
/* In your style.css */
.size-full { width: calc(100% - 16px); }
.size-unit { width: calc(20% - 16px); }
.size-two-units { width: calc(40% - 16px); }
.size-three-units { width: calc(60% - 16px); }
.size-four-units { width: calc(80% - 16px); }
.size-half { width: calc(50% - 16px); }

/* Create your own custom size */
.size-custom { width: calc(35% - 16px); }
```

Note: The `-16px` in the calculations accounts for grid margins (8px on each side). Always maintain this pattern for consistent spacing.

### Mobile Considerations
Grid items automatically stack on mobile devices (below 768px). You can customize this behavior in your CSS:

```css
@media (max-width: 768px) {
    .grid-item {
        width: calc(100% - 16px) !important; /* Full width on mobile */
    }
}
```

## Navigation System

POLLYGRID includes a modern navigation system with:

### Taskbar
The taskbar provides quick access to essential functions:
```html
<div class="taskbar">
    <div class="taskbar-start">
        <button class="start-button" onclick="toggleStartMenu()">
            <div class="header-title">Start</div>
        </button>
    </div>
    <div class="taskbar-widgets">
        <div class="info-tag" id="taskbarTime">2:30 PM</div>
    </div>
</div>
```

### Start Menu
A customizable start menu for main navigation:
```html
<div class="start-menu" id="startMenu">
    <div class="grid-item-header">
        <div class="header-title">Start Menu</div>
        <div class="window-controls">...</div>
    </div>
    <div class="start-menu-content">
        <div class="content-inner">
            <!-- Status Update -->
            <div class="status-update">
                <img src="avatar.png" alt="Avatar" class="avatar">
                <div class="speech-bubble">
                    <div class="user-name">Your Name</div>
                    <div class="description">Your status message</div>
                </div>
            </div>
            <!-- Navigation -->
            <div class="sidebar-content">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
```

### Preloader
A stylish loading screen for better user experience:
```html
<div class="preloader">
    <div class="preloader-window">
        <div class="preloader-header">
            <div class="header-title">Loading...</div>
            <div class="window-controls">...</div>
        </div>
        <div class="preloader-content">
            <div class="loading-bar-container">
                <div class="loading-bar"></div>
            </div>
            <div class="loading-text">0%</div>
        </div>
    </div>
</div>
```

## Example Components

### Grid Items
Here's a basic grid item you can copy and customize:
```html
<div class="grid-item size-half">
    <div class="grid-item-header">
        <div class="header-title">Title</div>
        <div class="window-controls">
            <div class="window-button minimize">-</div>
            <div class="window-button maximize">□</div>
            <div class="window-button close">×</div>
        </div>
    </div>
    <div class="grid-item-content">
        <div class="content-inner">
            Your awesome content goes here!
        </div>
    </div>
</div>
```

### Tooltips
Need to add some helpful hints? Try this:
```html
<div class="tooltip">
    Hover over me!
    <span class="tooltiptext">Your helpful message here</span>
</div>
```

### Modals
Want to add some pop-ups? Here's how:
```html
<!-- Add this button where you want to trigger the modal -->
<button class="modal-button" data-modal="myModal">Click Me!</button>

<!-- Add this modal at the end of your body tag -->
<div id="myModal" class="modal-overlay">
    <div class="modal-container">
        <div class="modal-header">
            <div class="modal-title">Hello there!</div>
            <div class="window-controls">
                <div class="window-button close">×</div>
            </div>
        </div>
        <div class="modal-content">
            Your modal content here
        </div>
    </div>
</div>
```

## Mobile & Touch Support

POLLYGRID now features comprehensive mobile support:

- Responsive grid layout that adapts to screen size
- Touch-optimized controls with larger tap targets
- iOS and Android specific optimizations
- Landscape mode support
- Safe area insets for notched devices
- Improved scrolling behavior on mobile
- Better touch feedback and interactions

Key breakpoints:
- Desktop: 1200px and above (default layout)
- Tablet Landscape: 1199px
- Tablet Portrait: 992px
- Mobile: 768px
- Small Mobile: 380px

## Browser Support

POLLYGRID works great on:
- Chrome
- Firefox
- Safari
- Edge

Just make sure you're using the latest version of your favorite browser!

## Credits & Thanks

Big thanks to these amazing resources that helped make POLLYGRID possible:
- [Muuri](https://muuri.dev/) for the incredible grid functionality
- Web Animations API for making everything smooth
- "Basiic" font by [cinni.net](https://cinni.net/font)
- The background pattern from [CSS Backgrounds by Magic Pattern](https://www.magicpattern.design/tools/css-backgrounds)

## Feedback & Questions

Thanks for checking out POLLYGRID! Did you run into any problems? Just wanted to say hi? I'd love to hear from you! Drop me a line at pollygondev@gmail.com or comment on the itch page!

## License

This template is released under CC0 1.0 Universal (CC0 1.0), which means you can do whatever you want with it! Use it in your personal projects, commercial work, modify it, share it - no attribution needed!

(Just remember that Muuri has its own MIT license that needs to be respected when you use it.)