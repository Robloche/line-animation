import Polyline from './polyline.js';
import Animation from './animation.js';

const circleMove = (x, y, radius, direction = 1) => {
  return (p, t, speed) => {
    const localT = (t * speed * direction) % (Math.PI * 2);

    p.x = x + Math.cos(localT) * radius;
    p.y = y + Math.sin(localT) * radius;
  };
};

const setAnimation1 = () => {
  return new Animation([
    new Polyline({
      close: true,
      color: '#007ACC',
      nbPoints: 3,
      speed: 4,
      updaters: [
        circleMove(500, 300, 100),
        circleMove(800, 300, 100, -1),
        circleMove(650, 600, 100, -1)
      ]
    })
  ], .05);
};

const setAnimation2 = () => {
  return new Animation([
    new Polyline({ close: true, color: '#007ACC', nbPoints: 3 }),
    new Polyline({ close: true, color: '#00FFCC', nbPoints: 4, speed: 6 }),
    new Polyline({ color: '#FF007A', nbPoints: 3, speed: 5 }),
    new Polyline({ color: '#FFCC00', nbPoints: 2, speed: 3.5 })
  ], .1);
};

const initialize = () => {
  setAnimation1().start();
  //setAnimation2().start();
};

window.onload = initialize;
