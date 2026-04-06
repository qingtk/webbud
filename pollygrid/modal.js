document.addEventListener('DOMContentLoaded', function() {
    // Get all modal buttons and modals
    const modalButtons = document.querySelectorAll('.modal-button');
    const modals = document.querySelectorAll('.modal-overlay');

    // Debug log
    console.log('Modal System Initialized');
    console.log('Found modal buttons:', modalButtons.length);
    console.log('Found modals:', modals.length);

    // Function to open modal
    function openModal(modalId) {
        console.log('Opening modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.visibility = 'visible';
            modal.style.display = 'flex';
            // Force a reflow
            modal.offsetHeight;
            modal.classList.add('active');
        }
    }

    // Function to close modal
    function closeModal(modal) {
        console.log('Closing modal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.visibility = 'hidden';
            modal.style.display = 'none';
        }, 300); // Match this with your CSS animation duration
    }

    // Add click listeners to all modal buttons
    modalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Add click listeners to all modal close buttons and overlay
    modals.forEach(modal => {
        // Close button click
        const closeButton = modal.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(modal));
        }

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Add keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
});