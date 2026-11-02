import Polyline from './polyline.js';
import Point from './point.js';

let canvas;
let ctx;

let startTime = null;

let isResizePending = false;
let resizeTimeout = null;

let cssWidth = 0;
let cssHeight = 0;

const circleMove = (x, y, radius) => {
  return (p, t) => {
    const localT = t % (Math.PI * 2);

    p.x = x + Math.cos(localT) * radius;
    p.y = y + Math.sin(localT) * radius;
  };
};

// const lines = [
//   new Polyline({
//     color: '#007ACC',
//     nbPoints: 2,
//     updaters: [circleMove(500, 300, 100), circleMove(800, 500, 50)]
//   })
// ];

const lines = [
  new Polyline({ close: true, color: '#007ACC', nbPoints: 3 }),
  new Polyline({ close: true, color: '#00FFCC', nbPoints: 4, speed: 6 }),
  new Polyline({ color: '#FF007A', nbPoints: 3, speed: 5 }),
  new Polyline({ color: '#FFCC00', nbPoints: 2, speed: 3.5 })
];

const draw = () => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  for (const line of lines) {
    line.draw(ctx);
  }
};

const animate = (timestamp) => {
  if (!startTime) {
    startTime = timestamp;
  }

  const t = (timestamp - startTime) / 1_000;

  for (const line of lines) {
    line.update(t);
  }

  draw();
  requestAnimationFrame(animate);
};

const resizeCanvas = () => {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  // Update available sizes
  cssHeight = rect.height;
  cssWidth = rect.width;

  Point.boundsHeight = cssHeight;
  Point.boundsWidth = cssWidth;

  // Set internal resolution scaled by HiDPI ratio
  const targetHeight = Math.floor(rect.height * dpr);
  const targetWidth = Math.floor(rect.width * dpr);

  // Avoid re-allocating buffer memory if internal size hasn't changed
  if (canvas.height !== targetHeight || canvas.width !== targetWidth) {
    canvas.height = targetHeight;
    canvas.width = targetWidth;
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
    line.init();
  }

  animate();
};

window.onload = initialize;
