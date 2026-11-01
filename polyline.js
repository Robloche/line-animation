import Point from './point.js';

class Polyline {
  constructor (color, speed = 4) {
    this.color = color;
    this.p1 = new Point(speed);
    this.p2 = new Point(speed);
  }

  init (boundsWidth, boundsHeight) {
    this.p1.init(boundsWidth, boundsHeight);
    this.p2.init(boundsWidth, boundsHeight);
  }

  update (boundsWidth, boundsHeight) {
    this.p1.update(boundsWidth, boundsHeight);
    this.p2.update(boundsWidth, boundsHeight);
  }

  draw (context) {
    context.strokeStyle = this.color;
    context.lineWidth = 1;
    context.lineCap = 'round';

    context.beginPath();
    context.moveTo(this.p1.x, this.p1.y);
    context.lineTo(this.p2.x, this.p2.y);
    context.stroke();
  }
}

export default Polyline;
