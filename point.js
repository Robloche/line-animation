import { getRandom, getRandomStep } from './helper.js';

class Point {
  static boundsWidth = 0;
  static boundsHeight = 0;

  constructor (x = 0, y = 0, dx = 0, dy = 0, speed = 4) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  init () {
    this.x = getRandom(0, Point.boundsWidth);
    this.y = getRandom(0, Point.boundsHeight);
    this.dx = getRandomStep(this.speed);
    this.dy = getRandomStep(this.speed);
  }

  update () {
    this.x += this.dx;
    this.y += this.dy;

    // Rebound horizontal borders
    if (this.x <= 0) {
      this.x = 0;
      this.dx *= -1;
    } else if (this.x >= Point.boundsWidth) {
      this.x = Point.boundsWidth;
      this.dx *= -1;
    }

    // Rebound vertical borders
    if (this.y <= 0) {
      this.y = 0;
      this.dy *= -1;
    } else if (this.y >= Point.boundsHeight) {
      this.y = Point.boundsHeight;
      this.dy *= -1;
    }
  }
}

export default Point;
