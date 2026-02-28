let zIndex = 100;
let windowIdCounter = 0;

setInterval(() => {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}, 1000);

function toggleStart() {
    const menu = document.getElementById('start-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    const btn = document.getElementById('start-btn');
    btn.className = menu.style.display === 'block' ? 'inset' : 'outset';
}

function openApp(url, title, w, h) {
    windowIdCounter++;
    const id = `win-${windowIdCounter}`;
    zIndex++;

    const win = document.createElement('div');
    win.className = 'window outset';
    win.id = id;
    win.style.width = w + 'px';
    win.style.height = h + 'px';
    win.style.left = (50 + windowIdCounter * 20) + 'px';
    win.style.top = (50 + windowIdCounter * 20) + 'px';
    win.style.zIndex = zIndex;
    win.onmousedown = () => bringToFront(win);

    win.innerHTML = `
        <div class="title-bar" onmousedown="dragStart(event, '${id}')">
            <span>${title}</span>
            <div class="title-bar-controls">
                <button onclick="minimizeWindow('${id}')">_</button>
                <button onclick="maximizeWindow('${id}')">□</button>
                <button onclick="closeWindow('${id}')">X</button>
            </div>
        </div>
        <div class="window-body inset">
            <iframe src="${url}"></iframe>
        </div>
    `;

    document.getElementById('desktop').appendChild(win);
    addTaskbarItem(id, title);
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if(win) win.remove();
    const task = document.getElementById(`task-${id}`);
    if(task) task.remove();
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';
    document.getElementById(`task-${id}`).className = 'task-tab outset';
}

function maximizeWindow(id) {
    const win = document.getElementById(id);
    if(win.style.width === '100%') {
        win.style.width = '600px'; 
        win.style.height = '400px';
        win.style.left = '50px';
        win.style.top = '50px';
    } else {
        win.style.width = '100%';
        win.style.height = 'calc(100% - 28px)';
        win.style.left = '0';
        win.style.top = '0';
    }
}

function bringToFront(el) {
    zIndex++;
    el.style.zIndex = zIndex;
    updateTaskbarActive(el.id);
}

function addTaskbarItem(id, title) {
    const task = document.createElement('div');
    task.className = 'task-tab outset active';
    task.id = `task-${id}`;
    task.innerText = title;
    task.onclick = () => {
        const win = document.getElementById(id);
        if (win.style.display === 'none') {
            win.style.display = 'flex';
            bringToFront(win);
        } else if (win.style.zIndex < zIndex) {
            bringToFront(win);
        } else {
            win.style.display = 'none'; 
            task.className = 'task-tab outset';
        }
    };
    document.getElementById('task-list').appendChild(task);
}

function updateTaskbarActive(activeId) {
    document.querySelectorAll('.task-tab').forEach(t => t.className = 'task-tab outset');
    const activeTask = document.getElementById(`task-${activeId}`);
    if (activeTask) activeTask.className = 'task-tab inset active';
}

let isDragging = false;
let dragOffset = {x:0, y:0};
let currentDragWin = null;

function dragStart(e, id) {
    if(e.target.tagName === 'BUTTON') return; 
    isDragging = true;
    currentDragWin = document.getElementById(id);
    const rect = currentDragWin.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    bringToFront(currentDragWin);
}

document.addEventListener('mousemove', (e) => {
    if (isDragging && currentDragWin) {
        currentDragWin.style.left = (e.clientX - dragOffset.x) + 'px';
        currentDragWin.style.top = (e.clientY - dragOffset.y) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentDragWin = null;
});

document.getElementById('desktop').addEventListener('click', (e) => {
    if(e.target.id === 'desktop') {
        document.getElementById('start-menu').style.display = 'none';
        document.getElementById('start-btn').className = 'outset';
    }
});