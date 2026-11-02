import { getRandom, getRandomStep } from './helper.js';

class Point {
  static boundsWidth = 0;
  static boundsHeight = 0;

  constructor ({ dx = 0, dy = 0, speed = 4, updater, x = 0, y = 0 }) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
    this.updater = updater ?? Point.defaultUpdater;
  }

  init () {
    this.x = getRandom(0, Point.boundsWidth);
    this.y = getRandom(0, Point.boundsHeight);
    this.dx = getRandomStep(this.speed);
    this.dy = getRandomStep(this.speed);
  }

  static defaultUpdater (p) {
    p.x += p.dx;
    p.y += p.dy;

    // Rebound horizontal borders
    if (p.x <= 0) {
      p.x = 0;
      p.dx *= -1;
    } else if (p.x >= Point.boundsWidth) {
      p.x = Point.boundsWidth;
      p.dx *= -1;
    }

    // Rebound vertical borders
    if (p.y <= 0) {
      p.y = 0;
      p.dy *= -1;
    } else if (p.y >= Point.boundsHeight) {
      p.y = Point.boundsHeight;
      p.dy *= -1;
    }
  }

  update (t) {
    this.updater(this, t);
  }
}

export default Point;
