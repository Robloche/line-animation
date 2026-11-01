import Polyline from './polyline.js';

let canvas;
let ctx;

let isResizePending = false;
let resizeTimeout = null;

let cssWidth = 0;
let cssHeight = 0;

const lines = [
  new Polyline('#007ACC', 3, true, 4),
  new Polyline('#00FFCC', 4, true, 6),
  new Polyline('#FF007A', 3, false, 5),
  new Polyline('#FFCC00', 2, false, 3.5)
];

const draw = () => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  for (const line of lines) {
    line.draw(ctx);
  }
};

const animate = () => {
  for (const line of lines) {
    line.update(cssWidth, cssHeight);
  }

  draw();
  requestAnimationFrame(animate);
};

const resizeCanvas = () => {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  // Update available sizes
  cssWidth = rect.width;
  cssHeight = rect.height;

  // Set internal resolution scaled by HiDPI ratio
  const targetWidth = Math.floor(rect.width * dpr);
  const targetHeight = Math.floor(rect.height * dpr);

  // Avoid re-allocating buffer memory if internal size hasn't changed
  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.scale(dpr, dpr);

    // Initial background fill to ensure buffer isn't transparent
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cssWidth, cssHeight);
  }
};

const handleResize = () => {
  // Throttle screen updates to the native display refresh rate
  if (!isResizePending) {
    isResizePending = true;
    requestAnimationFrame(() => {
      resizeCanvas();
      draw();
      isResizePending = false;
    });
  }

  // Finalize alignment once dragging stops
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resizeCanvas();
    draw();
  }, 100);
};

const initialize = () => {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');

  ctx.lineWidth = 1;
  ctx.lineCap = 'round';

  resizeCanvas();
  window.addEventListener('resize', handleResize);

  for (const line of lines) {
    line.init(cssWidth, cssHeight);
  }

  animate();
};

window.onload = initialize;
