document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Data ---
    // Example hierarchical data structure
    const treeData = [
        {
            id: '1',
            label: 'Root Node 1',
            children: [
                {
                    id: '1.1',
                    label: 'Child 1.1',
                    children: [
                        { id: '1.1.1', label: 'Grandchild 1.1.1' },
                        { id: '1.1.2', label: 'Grandchild 1.1.2' }
                    ]
                },
                {
                    id: '1.2',
                    label: 'Child 1.2 (Leaf)'
                }
            ]
        },
        {
            id: '2',
            label: 'Root Node 2',
            children: [
                { id: '2.1', label: 'Child 2.1' }
            ]
        },
        {
            id: '3',
            label: 'Root Node 3 (Leaf)'
        }
    ];

    // --- 2. Tree Rendering Function ---
    const treeContainer = document.getElementById('tree-container');

    function createTreeNode(nodeData) {
        const li = document.createElement('li');
        li.classList.add('tree-node');
        li.dataset.nodeId = nodeData.id; // Optional: store node id

        // Content wrapper (for toggle + label)
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('node-content');

        // Toggle Element (only if node has children)
        const toggle = document.createElement('span');
        toggle.classList.add('toggle');

        // Label Element
        const label = document.createElement('span');
        label.classList.add('node-label');
        label.textContent = nodeData.label;

        // Check if the node has children
        const hasChildren = nodeData.children && nodeData.children.length > 0;

        if (hasChildren) {
            li.classList.add('has-children');
            contentDiv.appendChild(toggle); // Add toggle only if there are children
        } else {
            // Add padding to align leaf nodes with nodes that have toggles
            toggle.style.visibility = 'hidden'; // Keep space but hide
             contentDiv.appendChild(toggle);
        }

        contentDiv.appendChild(label);
        li.appendChild(contentDiv);


        // Recursive call for children
        if (hasChildren) {
            const childrenUl = document.createElement('ul');
            nodeData.children.forEach(childNode => {
                childrenUl.appendChild(createTreeNode(childNode));
            });
            li.appendChild(childrenUl);

             // Optional: Set initial expanded state
             if (nodeData.expanded) {
                 li.classList.add('expanded');
             }
        }

        return li;
    }

    function renderTree(data, container) {
        const rootUl = document.createElement('ul');
        data.forEach(nodeData => {
            rootUl.appendChild(createTreeNode(nodeData));
        });
        container.innerHTML = ''; // Clear previous content
        container.appendChild(rootUl);
    }

    // --- 3. Event Handling (Expand/Collapse) ---
    treeContainer.addEventListener('click', (event) => {
        // Use event delegation - check if the click was on a toggle element
        const toggle = event.target.closest('.toggle'); // Find nearest ancestor with .toggle class

        if (toggle) {
             // Find the parent LI (the node itself)
            const nodeLi = toggle.closest('.tree-node');
            if (nodeLi && nodeLi.classList.contains('has-children')) {
                nodeLi.classList.toggle('expanded'); // Toggle the 'expanded' class
            }
        }

        // Optional: Handle clicks on the label itself if needed
        // const label = event.target.closest('.node-label');
        // if (label) {
        //     const nodeLi = label.closest('.tree-node');
        //     console.log('Clicked on label:', label.textContent, 'Node ID:', nodeLi.dataset.nodeId);
        //     // Add actions here, like selecting the node
        // }
    });

    // --- 4. Initial Render ---
    renderTree(treeData, treeContainer);

}); // End DOMContentLoaded