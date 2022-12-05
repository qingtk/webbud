/*
const opts = {
  steps: 1000,
  noisePos: 4,
  speed: 0.00001,
  items: 1000,
};
const gui = new Tweakpane();

gui.addInput(opts, 'steps', {
  min: 0,
  max: 2000,
});*/

const canvasWidth = 20;
const canvasHeight = 20;
const resolution = 1.5;

const getGridDom = (x, y) => new Array(x * y).fill(0).reduce((r, a, i) => `${r}<div class="dot" style="--x: ${i % x / x}; --y: ${Math.floor(x * i / (x * y)) / y}; --i: ${i}; --val: var(--val${i})"></div>`, '');

const $wrap = document.querySelector('#wrap');
let tick = 0;

const $style = document.createElement('style');
document.head.appendChild($style);

function paint() {
  let startTime = performance.now();
  let i = 0;
  let styleVars = '';
  let buffer = '';
  let tickdown = tick * .01;
  const M = 12;

  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      const index = (x + y * canvasWidth) * 4;

      const x1 = resolution * (x / canvasWidth);
      const y1 = resolution * (y / canvasHeight);

      const n = tooloud.Worley.Euclidean(x1 + tickdown * .5, y1, tickdown);

      buffer += `--val${i++}: ${10 * Math.sin(Math.pow(n[0], 2))};`;

      if (buffer.length >= M) {
        styleVars += buffer;
        buffer = '';
      }
    }
  }


  styleVars += buffer;

  /*
                       if(tick) {
                         $style.sheet.removeRule(0);
                       }
                       $style.sheet.insertRule(`#wrap { ${styleVars} }`, 0);
                       */

  $wrap.style = styleVars;
  tick++;
  console.log(performance.now() - startTime);
  requestAnimationFrame(paint);
}

$wrap.innerHTML = getGridDom(canvasWidth, canvasHeight);


paint();