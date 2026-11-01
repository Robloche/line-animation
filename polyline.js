import Point from './point.js';

class Polyline {
  constructor (color, nbPoints = 2, close = false, speed = 4) {
    this.close = close;
    this.color = color;
    this.points = [];
    for (let i = 0; i < nbPoints; i++) {
      this.points.push(new Point(speed));
    }
  }

  init () {
    this.points.forEach(point => point.init());
  }

  update () {
    this.points.forEach(point => point.update());
  }

  draw (context) {
    context.strokeStyle = this.color;
    context.lineWidth = 1;
    context.lineCap = 'round';

    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      context.lineTo(this.points[i].x, this.points[i].y);
    }

    if (this.close) {
      context.closePath();
    }

    context.stroke();
  }
}

export default Polyline;
