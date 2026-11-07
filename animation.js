import Point from './point.js';

class Animation {
  constructor (lines, eraserOpacity = 1) {
    this.cssWidth = 0;
    this.cssHeight = 0;
    this.isResizePending = false;
    this.resizeTimeout = null;
    this.startTime = null;

    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.ctx.lineWidth = 1;
    this.ctx.lineCap = 'round';

    this.resizeCanvas();
    window.addEventListener('resize', this.handleResize);

    this.lines = lines;
    this.eraserOpacity = eraserOpacity;
  }

  start = () => {
    for (const line of this.lines) {
      line.init();
    }

    this.animate();
  };

  draw = () => {
    this.ctx.fillStyle = `rgba(0, 0, 0, ${this.eraserOpacity})`;
    this.ctx.fillRect(0, 0, this.cssWidth, this.cssHeight);

    for (const line of this.lines) {
      line.draw(this.ctx);
    }
  };

  animate = (timestamp) => {
    //console.log(timestamp);
    if (!this.startTime) {
      this.startTime = timestamp;
    }

    const t = (timestamp - this.startTime) / 1_000;

    for (const line of this.lines) {
      line.update(t);
    }

    this.draw();
    requestAnimationFrame(this.animate);
  };

  resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    // Update available sizes
    this.cssHeight = rect.height;
    this.cssWidth = rect.width;

    Point.boundsHeight = this.cssHeight;
    Point.boundsWidth = this.cssWidth;

    // Set internal resolution scaled by HiDPI ratio
    const targetHeight = Math.floor(rect.height * dpr);
    const targetWidth = Math.floor(rect.width * dpr);

    // Avoid re-allocating buffer memory if internal size hasn't changed
    if (this.canvas.height !== targetHeight || this.canvas.width !== targetWidth) {
      this.canvas.height = targetHeight;
      this.canvas.width = targetWidth;
      this.ctx.scale(dpr, dpr);

      // Initial background fill to ensure buffer isn't transparent
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, this.cssWidth, this.cssHeight);
    }
  };

  handleResize = () => {
    // Throttle screen updates to the native display refresh rate
    if (!this.isResizePending) {
      this.isResizePending = true;
      requestAnimationFrame(() => {
        this.resizeCanvas();
        this.draw();
        this.isResizePending = false;
      });
    }

    // Finalize alignment once dragging stops
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.resizeCanvas();
      this.draw();
    }, 100);
  };
}

export default Animation;
