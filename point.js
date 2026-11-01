import { getRandom, getRandomStep } from './helper.js';

class Point {
  constructor (x = 0, y = 0, dx = 0, dy = 0, speed = 4) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  init (boundsWidth, boundsHeight) {
    this.x = getRandom(0, boundsWidth);
    this.y = getRandom(0, boundsHeight);
    this.dx = getRandomStep(this.speed);
    this.dy = getRandomStep(this.speed);
  }

  update (boundsWidth, boundsHeight) {
    this.x += this.dx;
    this.y += this.dy;

    // Rebound horizontal borders
    if (this.x <= 0) {
      this.x = 0;
      this.dx *= -1;
    } else if (this.x >= boundsWidth) {
      this.x = boundsWidth;
      this.dx *= -1;
    }

    // Rebound vertical borders
    if (this.y <= 0) {
      this.y = 0;
      this.dy *= -1;
    } else if (this.y >= boundsHeight) {
      this.y = boundsHeight;
      this.dy *= -1;
    }
  }
}

export default Point;
