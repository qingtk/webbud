/**
 * POLLYGRID
 * Handles grid initialization and drag-and-drop functionality
 * Requires Muuri library and Web Animations API
 */

// Preloader functionality
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingText = document.querySelector('.loading-text');
    let progress = 0;

    function updateLoader() {
        if (progress < 100) {
            progress += Math.random() * 30;
            progress = Math.min(progress, 100);
            loadingBar.style.width = progress + '%';
            loadingText.textContent = Math.round(progress) + '%';
            
            if (progress < 100) {
                setTimeout(updateLoader, 200);
            } else {
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 500);
            }
        }
    }

    // Start the loading animation
    updateLoader();

    // Initialize Muuri grid with configuration
    const grid = new Muuri('.grid', {
        // Enable drag functionality
        dragEnabled: true,
        // Set drag handle to header area
        dragHandle: '.grid-item-header',
        
        // Layout configuration
        layout: {
            fillGaps: false,          // Don't auto-fill gaps
            horizontal: false,         // Vertical layout
            alignRight: false,         // Left alignment
            alignBottom: false,        // Top alignment
            rounding: true,           // Round positions to pixels
            respectDimensions: true,   // Maintain item dimensions
            alignItems: { x: 'left', y: 'top' }  // Item alignment
        },

        // Drag start settings
        dragStartPredicate: {
            distance: 0,  // Start immediately
            delay: 0,     // No delay
            handle: true  // Only drag from handle
        },

        // Animation settings
        layoutDuration: 400,     // Layout animation duration
        layoutEasing: 'ease',    // Layout animation easing

        // Drag release animation
        dragRelease: {
            duration: 400,           // Release animation duration
            easing: 'ease',          // Release animation easing
            useDragContainer: true   // Use drag container
        },

        // Drag sorting settings
        dragSort: true,           // Enable drag sorting
        dragSortInterval: 50,     // Sort interval during drag
        dragSortPredicate: {
            threshold: 30,        // Distance before sort
            action: 'move'        // Sort action type
        }
    });

    // Update cursor style during drag operations
    grid.on('dragStart', function(item) {
        item.getElement().querySelector('.grid-item-header').style.cursor = 'grabbing';
    });

    grid.on('dragEnd', function(item) {
        item.getElement().querySelector('.grid-item-header').style.cursor = 'grab';
    });

    // Handle window resize with debouncing
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= 991) {
                // Disable dragging on mobile
                grid.dragEnabled = false;
                // Force layout refresh
                document.querySelectorAll('.grid-item').forEach(item => {
                    item.style.position = 'relative';
                    item.style.left = 'auto';
                    item.style.top = 'auto';
                    item.style.transform = 'none';
                });
            } else {
                grid.dragEnabled = true;
            }
            grid.refreshItems().layout();
        }, 150);
    });

    // Initialize grid layout
    grid.layout(true);
});

// Start Menu functionality
function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const overlay = document.querySelector('.start-menu-overlay');
    
    if (startMenu.style.display === 'none') {
        startMenu.style.display = 'block';
        overlay.classList.add('active');
    } else {
        startMenu.style.display = 'none';
        overlay.classList.remove('active');
    }
}

// Close start menu when clicking overlay
document.querySelector('.start-menu-overlay').addEventListener('click', function() {
    toggleStartMenu();
});

// Close start menu when clicking outside
document.addEventListener('click', function(event) {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.start-button');
    const overlay = document.querySelector('.start-menu-overlay');
    
    if (!startMenu.contains(event.target) && 
        !startButton.contains(event.target) && 
        !overlay.contains(event.target) && 
        startMenu.style.display !== 'none') {
        toggleStartMenu();
    }
});

// Update taskbar time
function updateTime() {
    const timeElement = document.getElementById('taskbarTime');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    timeElement.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Update time immediately and every minute
updateTime();
setInterval(updateTime, 60000);