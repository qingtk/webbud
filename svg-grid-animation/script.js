class SVGGridAnimation {
    constructor() {
        this.gridContainer = document.querySelector('.grid-container');
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.isPlaying = true;
        this.gridSize = 6;
        this.animationClasses = [
            'animate-rotate',
            'animate-pulse', 
            'animate-bounce',
            'animate-scale',
            'animate-wave',
            'animate-morph'
        ];
        
        this.init();
    }
    
    init() {
        this.createGrid();
        this.bindEvents();
        this.startSequentialAnimation();
    }
    
    createGrid() {
        this.gridContainer.innerHTML = '';
        
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.dataset.index = i;
            
            const svg = this.createRandomSVG(i);
            gridItem.appendChild(svg);
            
            this.gridContainer.appendChild(gridItem);
            
            // Add click event for individual item animation
            gridItem.addEventListener('click', () => this.animateItem(gridItem));
        }
    }
    
    createRandomSVG(index) {
        const svgTypes = [
            this.createCircleSVG,
            this.createSquareSVG,
            this.createTriangleSVG,
            this.createStarSVG,
            this.createHeartSVG,
            this.createHexagonSVG,
            this.createDiamondSVG,
            this.createFlowerSVG
        ];
        
        const randomType = svgTypes[index % svgTypes.length];
        return randomType.call(this, index);
    }
    
    createCircleSVG(index) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        const color = colors[index % colors.length];
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '50');
        circle.setAttribute('cy', '50');
        circle.setAttribute('r', '35');
        circle.setAttribute('fill', color);
        circle.setAttribute('stroke', '#fff');
        circle.setAttribute('stroke-width', '3');
        
        svg.appendChild(circle);
        return svg;
    }
    
    createSquareSVG(index) {
        const colors = ['#e17055', '#74b9ff', '#a29bfe', '#fd79a8', '#fdcb6e', '#6c5ce7'];
        const color = colors[index % colors.length];
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '15');
        rect.setAttribute('y', '15');
        rect.setAttribute('width', '70');
        rect.setAttribute('height', '70');
        rect.setAttribute('fill', color);
        rect.setAttribute('stroke', '#fff');
        rect.setAttribute('stroke-width', '3');
        rect.setAttribute('rx', '10');
        
        svg.appendChild(rect);
        return svg;
    }
    
    createTriangleSVG(index) {
        const colors = ['#00b894', '#e84393', '#0984e3', '#a29bfe', '#fd79a8', '#fdcb6e'];
        const color = colors[index % colors.length];
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '50,15 85,75 15,75');
        polygon.setAttribute('fill', color);
        polygon.setAttribute('stroke', '#fff');
        polygon.setAttribute('stroke-width', '3');
        
        svg.appendChild(polygon);
        return svg;
    }
    
    createStarSVG(index) {
        const colors = ['#ffd32a', '#ff7675', '#74b9ff', '#55a3ff', '#fd79a8', '#fdcb6e'];
        const color = colors[index % colors.length];
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '50,10 61,35 85,35 67,53 73,78 50,65 27,78 33,53 15,35 39,35');
        polygon.setAttribute('fill', color);
        polygon.setAttribute('stroke', '#fff');
        polygon.setAttribute('stroke-width', '2');
        
        svg.appendChild(polygon);
        return svg;
    }
    
    createHeartSVG(index) {
        const colors = ['#e84393', '#fd79a8', '#ff7675', '#ff6b9d', '#c44569', '#f8b500'];
        const color = colors[index % colors.length];
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M50,85 C50,85 20,65 20,40 C20,25 30,15 45,15 C47,15 50,20 50,20 C50,20 53,15 55,15 C70,15 80,25 80,40 C80,65 50,85 50,85 Z');
        path.setAttribute('fill', color);
        path.setAttribute('stroke', '#fff');
        path.setAttribute('stroke-width', '2');
        
        svg.appendChild(path);
        return svg;
    }
    
    createHexagonSVG(index) {
        const colors = ['#00cec9', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e', '#e17055'];
        const color = colors[index % colors.length];
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '50,10 80,30 80,70 50,90 20,70 20,30');
        polygon.setAttribute('fill', color);
        polygon.setAttribute('stroke', '#fff');
        polygon.setAttribute('stroke-width', '3');
        
        svg.appendChild(polygon);
        return svg;
    }
    
    createDiamondSVG(index) {
        const colors = ['#00b894', '#e84393', '#0984e3', '#a29bfe', '#fd79a8', '#fdcb6e'];
        const color = colors[index % colors.length];
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '50,15 75,50 50,85 25,50');
        polygon.setAttribute('fill', color);
        polygon.setAttribute('stroke', '#fff');
        polygon.setAttribute('stroke-width', '3');
        
        svg.appendChild(polygon);
        return svg;
    }
    
    createFlowerSVG(index) {
        const colors = ['#ff7675', '#74b9ff', '#55a3ff', '#fd79a8', '#fdcb6e', '#00b894'];
        const color = colors[index % colors.length];
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        
        // Create flower petals
        for (let i = 0; i < 6; i++) {
            const petal = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            petal.setAttribute('cx', '50');
            petal.setAttribute('cy', '30');
            petal.setAttribute('rx', '8');
            petal.setAttribute('ry', '20');
            petal.setAttribute('fill', color);
            petal.setAttribute('stroke', '#fff');
            petal.setAttribute('stroke-width', '1');
            petal.setAttribute('transform', `rotate(${i * 60} 50 50)`);
            svg.appendChild(petal);
        }
        
        // Center circle
        const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center.setAttribute('cx', '50');
        center.setAttribute('cy', '50');
        center.setAttribute('r', '8');
        center.setAttribute('fill', '#fff');
        center.setAttribute('stroke', color);
        center.setAttribute('stroke-width', '2');
        
        svg.appendChild(center);
        return svg;
    }
    
    animateItem(gridItem) {
        const svg = gridItem.querySelector('svg');
        const randomAnimation = this.animationClasses[Math.floor(Math.random() * this.animationClasses.length)];
        
        // Remove existing animation classes
        this.animationClasses.forEach(cls => svg.classList.remove(cls));
        
        // Add new animation
        svg.classList.add(randomAnimation);
        
        // Add temporary highlight effect
        gridItem.style.background = 'rgba(255, 255, 255, 0.4)';
        setTimeout(() => {
            gridItem.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 300);
    }
    
    startSequentialAnimation() {
        const gridItems = document.querySelectorAll('.grid-item');
        
        gridItems.forEach((item, index) => {
            setTimeout(() => {
                if (this.isPlaying) {
                    const svg = item.querySelector('svg');
                    const randomAnimation = this.animationClasses[index % this.animationClasses.length];
                    svg.classList.add(randomAnimation);
                }
            }, index * 200);
        });
    }
    
    bindEvents() {
        this.playBtn.addEventListener('click', () => this.play());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // Add keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.isPlaying ? this.pause() : this.play();
                    break;
                case 'r':
                case 'R':
                    this.reset();
                    break;
            }
        });
    }
    
    play() {
        this.isPlaying = true;
        document.body.classList.remove('paused');
        this.playBtn.style.opacity = '0.5';
        this.pauseBtn.style.opacity = '1';
    }
    
    pause() {
        this.isPlaying = false;
        document.body.classList.add('paused');
        this.playBtn.style.opacity = '1';
        this.pauseBtn.style.opacity = '0.5';
    }
    
    reset() {
        this.isPlaying = true;
        document.body.classList.remove('paused');
        
        // Remove all animations
        const svgs = document.querySelectorAll('.grid-item svg');
        svgs.forEach(svg => {
            this.animationClasses.forEach(cls => svg.classList.remove(cls));
        });
        
        // Restart sequential animation
        setTimeout(() => {
            this.startSequentialAnimation();
        }, 100);
        
        this.playBtn.style.opacity = '0.5';
        this.pauseBtn.style.opacity = '1';
    }
    
    // Method to change grid size (can be called externally)
    changeGridSize(size) {
        this.gridSize = size;
        const container = this.gridContainer;
        container.style.gridTemplateColumns = `repeat(${size}, 80px)`;
        container.style.gridTemplateRows = `repeat(${size}, 80px)`;
        this.createGrid();
        this.startSequentialAnimation();
    }
}

// Initialize the animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const svgAnimation = new SVGGridAnimation();
    
    // Make it globally accessible for debugging/external control
    window.svgAnimation = svgAnimation;
    
    // Add some fun easter eggs
    let clickCount = 0;
    document.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 10) {
            svgAnimation.changeGridSize(8);
            clickCount = 0;
        }
    });
});
