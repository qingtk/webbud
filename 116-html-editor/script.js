document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const toolbar = document.getElementById('toolbar');
    const showHtmlBtn = document.getElementById('show-html-btn');
    const htmlOutput = document.getElementById('html-output');

    // --- Toolbar Actions ---
    toolbar.addEventListener('click', (event) => {
        const target = event.target;
        let command = null;
        let value = null;

        // Check if clicked element is a button or inside a button
        const button = target.closest('button[data-command]');
        if (button) {
            command = button.dataset.command;
        }

        // Check if clicked element is a select or inside a select
        const select = target.closest('select[data-command]');
         if (target.tagName === 'SELECT' && target.dataset.command) {
             command = target.dataset.command;
             value = target.value; // Get the selected value (e.g., 'h1', 'p')
        }


        if (command) {
            event.preventDefault(); // Prevent default button behavior if any

            // Handle special commands
            if (command === 'createLink') {
                const url = prompt('Enter the URL:');
                if (url) {
                    // Make sure there's a selection before creating a link
                    const selection = window.getSelection();
                    if (!selection || selection.toString().length === 0) {
                        alert("Please select the text you want to link.");
                        return;
                    }
                    document.execCommand(command, false, url);
                }
            } else if (command === 'formatBlock') {
                 if (value) { // Value comes from the select dropdown
                     document.execCommand(command, false, value);
                 }
            }
            else {
                // Execute standard commands
                document.execCommand(command, false, value); // Value is null for most commands
            }

            // Re-focus the editor after action
            editor.focus();
        }
    });

     // Handle change event for select dropdown
    toolbar.addEventListener('change', (event) => {
        const target = event.target;
        if (target.tagName === 'SELECT' && target.dataset.command === 'formatBlock') {
            const command = target.dataset.command;
            const value = target.value;
            if (value) {
                 document.execCommand(command, false, value);
                 editor.focus();
            }
        }
    });

    // --- Show HTML Source ---
    showHtmlBtn.addEventListener('click', () => {
        // Get the HTML content from the editor
        const rawHtml = editor.innerHTML;

        // Display the HTML (escape HTML characters for safe display within <code>)
        htmlOutput.textContent = rawHtml;

        // Optional: Basic syntax highlighting (very simple) could be added here
        // For robust highlighting, use libraries like Prism.js or highlight.js
    });

    // --- Initial Focus ---
    // Optional: Focus the editor when the page loads
    // editor.focus();
});