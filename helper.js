const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomStep = (speed) => {
  const step = getRandom(-speed, speed);
  return step === 0 ? speed : step;
};

export {
  getRandom,
  getRandomStep
};
