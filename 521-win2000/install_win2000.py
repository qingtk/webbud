import os

# 定义文件夹名称
folder_name = "win2000_sim"

# 定义所有文件的内容
files_content = {
    "style.css": r"""
body {
    font-family: 'Tahoma', sans-serif;
    font-size: 11px;
    margin: 0;
    padding: 0;
    background-color: #c0c0c0;
    user-select: none;
    overflow: hidden;
}
.outset { border: 2px solid; border-color: #fff #808080 #808080 #fff; }
.inset { border: 2px solid; border-color: #808080 #fff #fff #808080; }
#desktop {
    width: 100vw;
    height: calc(100vh - 28px);
    background-color: #3A6EA5;
    position: relative;
    overflow: hidden;
}
.desktop-icon {
    width: 70px;
    text-align: center;
    color: white;
    margin: 10px;
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
}
.desktop-icon .icon-img {
    width: 32px;
    height: 32px;
    background: navy;
    margin: 0 auto 5px;
    border: 1px solid white;
}
.window {
    position: absolute;
    background: #c0c0c0;
    padding: 2px;
    box-shadow: 1px 1px 0 black;
    display: flex;
    flex-direction: column;
    min-width: 200px;
    min-height: 100px;
}
.title-bar {
    background: linear-gradient(90deg, #000080, #1084d0);
    color: white;
    padding: 3px 2px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title-bar-controls button {
    width: 16px;
    height: 14px;
    font-size: 9px;
    line-height: 10px;
    background: #c0c0c0;
    border: 1px solid white;
    border-right-color: black;
    border-bottom-color: black;
    margin-left: 2px;
    cursor: pointer;
}
.window-body {
    flex-grow: 1;
    margin-top: 2px;
    background: white;
    position: relative;
}
iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
}
#taskbar {
    height: 26px;
    background: #c0c0c0;
    border-top: 1px solid #fff;
    display: flex;
    align-items: center;
    padding: 1px;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 9999;
}
#start-btn {
    font-weight: bold;
    font-style: italic;
    padding: 2px 6px;
    margin-right: 5px;
    display: flex;
    align-items: center;
}
#start-btn img { width: 16px; height: 16px; margin-right: 4px; }
.task-tab {
    flex: 0 0 150px;
    padding: 2px 5px;
    margin-right: 2px;
    background: #c0c0c0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}
.task-tab.active {
    background: #e0e0e0;
    border-color: #808080 #fff #fff #808080; 
}
#clock {
    margin-left: auto;
    padding: 2px 10px;
    border: 1px solid;
    border-color: #808080 #fff #fff #808080;
    background: #c0c0c0;
}
#start-menu {
    position: absolute;
    bottom: 28px;
    left: 0;
    width: 200px;
    background: #c0c0c0;
    display: none;
    z-index: 10000;
    padding: 2px;
}
.start-side {
    width: 20px;
    background: #000080;
    position: absolute;
    top: 0; bottom: 0; left: 0;
    color: white;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-align: center;
    padding-top: 10px;
    font-weight: bold;
    font-size: 14px;
}
.start-items { margin-left: 22px; }
.start-item {
    padding: 8px 10px;
    cursor: pointer;
}
.start-item:hover { background: #000080; color: white; }
.menubar { background: #c0c0c0; padding: 2px; border-bottom: 1px solid gray;}
.menubar span { padding: 0 5px; cursor: pointer; }
.toolbar { background: #c0c0c0; padding: 5px; border-bottom: 1px solid gray; display: flex; gap: 5px;}
""",

    "script.js": r"""
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
""",

    "index.html": r"""
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Windows 2000 Professional</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="desktop">
        <div class="desktop-icon" ondblclick="openApp('explorer.html', '我的电脑', 600, 400)">
            <div class="icon-img" style="background: url('https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png') no-repeat center;"></div>
            我的电脑
        </div>
        <div class="desktop-icon" ondblclick="openApp('browser.html', 'Internet Explorer', 800, 500)">
            <div class="icon-img" style="background: url('https://win98icons.alexmeub.com/icons/png/msie2-2.png') no-repeat center;"></div>
            网上邻居
        </div>
        <div class="desktop-icon" ondblclick="openApp('notepad.html', '未命名 - 记事本', 400, 300)">
            <div class="icon-img" style="background: url('https://win98icons.alexmeub.com/icons/png/notepad-0.png') no-repeat center;"></div>
            记事本
        </div>
    </div>

    <div id="start-menu" class="outset">
        <div class="start-side">Windows 2000 Professional</div>
        <div class="start-items">
            <div class="start-item" onclick="openApp('explorer.html', '资源管理器', 600, 400); toggleStart();">资源管理器</div>
            <div class="start-item" onclick="openApp('browser.html', 'Internet Explorer', 800, 500); toggleStart();">Internet Explorer</div>
            <div class="start-item" onclick="openApp('notepad.html', '记事本', 400, 300); toggleStart();">记事本</div>
            <hr>
            <div class="start-item" onclick="alert('现在关机吗？'); toggleStart();">关机...</div>
        </div>
    </div>

    <div id="taskbar" class="outset">
        <div id="start-btn" class="outset" onclick="toggleStart()">
            <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="logo"> 开始
        </div>
        <div id="task-list" style="display:flex; flex-grow: 1; overflow:hidden; padding-left: 5px;"></div>
        <div id="clock" class="inset">12:00 PM</div>
    </div>
    <script src="script.js"></script>
</body>
</html>
""",

    "notepad.html": r"""
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <style>
        body, html { height: 100%; overflow: hidden; background: #c0c0c0;}
        textarea {
            width: 100%;
            height: calc(100% - 25px);
            border: none;
            resize: none;
            font-family: 'Courier New', monospace;
            padding: 5px;
            box-sizing: border-box;
            outline: none;
        }
    </style>
</head>
<body>
    <div class="menubar">
        <span>文件(F)</span> <span>编辑(E)</span> <span>格式(O)</span> <span>帮助(H)</span>
    </div>
    <textarea class="inset"></textarea>
</body>
</html>
""",

    "browser.html": r"""
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <style>
        body, html { height: 100%; overflow: hidden; background: #c0c0c0;}
        .address-bar { display: flex; align-items: center; padding: 2px; }
        input { flex-grow: 1; margin: 0 5px; }
        .browser-content {
            background: white;
            height: calc(100% - 60px);
            padding: 20px;
            border-top: 2px solid gray;
            overflow: auto;
        }
    </style>
</head>
<body>
    <div class="menubar">
        <span>文件(F)</span> <span>编辑(E)</span> <span>查看(V)</span> <span>收藏(A)</span>
    </div>
    <div class="toolbar">
        <button class="outset">后退</button>
        <button class="outset">前进</button>
        <button class="outset">停止</button>
        <button class="outset">刷新</button>
        <button class="outset">主页</button>
    </div>
    <div class="address-bar">
        <span>地址(D):</span>
        <input type="text" value="http://www.microsoft.com" class="inset">
        <button class="outset">转到</button>
    </div>
    <div class="browser-content inset">
        <h1>无法找到该页</h1>
        <p>您正在搜索的页面可能已经删除、更名或暂时不可用。</p>
        <hr>
        <p style="color: gray; font-size: 10px;">HTTP 404 - 文件未找到<br>Internet Explorer</p>
    </div>
</body>
</html>
""",

    "explorer.html": r"""
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <style>
        body, html { height: 100%; overflow: hidden; background: #c0c0c0; }
        .main-view { display: flex; height: calc(100% - 55px); margin-top: 2px;}
        .sidebar { width: 150px; background: white; margin-right: 2px; padding: 5px; overflow: auto;}
        .file-area { flex-grow: 1; background: white; padding: 10px; overflow: auto; display: flex; flex-wrap: wrap; align-content: flex-start;}
        .file-item {
            width: 60px;
            text-align: center;
            margin: 5px;
            cursor: pointer;
        }
        .file-icon { width: 32px; height: 32px; background: #f2cb1d; margin: 0 auto; border: 1px solid brown;}
        .tree-node { padding-left: 10px; cursor: pointer; }
        .tree-node:hover { background: #000080; color: white; }
    </style>
</head>
<body>
    <div class="menubar">
        <span>文件(F)</span> <span>编辑(E)</span> <span>查看(V)</span> <span>收藏(A)</span>
    </div>
    <div class="toolbar">
        <button class="outset">后退</button> 
        <button class="outset">前进</button> 
        <button class="outset">向上</button> 
    </div>
    <div class="address-bar" style="padding:2px; display:flex;">
        <span>地址(D):</span>
        <input type="text" value="C:\My Documents" class="inset" style="flex-grow:1; margin-left:5px;">
    </div>
    <div class="main-view">
        <div class="sidebar inset">
            <div class="tree-node">桌面</div>
            <div class="tree-node">├─ 我的电脑</div>
            <div class="tree-node">│  ├─ 本地磁盘 (C:)</div>
            <div class="tree-node">│  └─ 本地磁盘 (D:)</div>
        </div>
        <div class="file-area inset">
            <div class="file-item">
                <div class="file-icon"></div>
                <span>我的文档</span>
            </div>
            <div class="file-item">
                <div class="file-icon" style="background:white; border:1px solid gray;"></div>
                <span>说明.txt</span>
            </div>
        </div>
    </div>
</body>
</html>
"""
}

# 检查并创建文件夹
if not os.path.exists(folder_name):
    os.makedirs(folder_name)
    print(f"创建文件夹: {folder_name}")

# 写入文件
for filename, content in files_content.items():
    file_path = os.path.join(folder_name, filename)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content.strip())
    print(f"已生成: {filename}")

print("\n成功！所有文件已保存到 'win2000_sim' 文件夹中。")
print(f"请打开 {folder_name}/index.html 开始体验。")