const timer = (time) => {
  if (time < 0) {
    throw new Error(`Time argument can not be negative`);
  }
  if (typeof time !== `number`) {
    throw new Error(`Time argument has to be of type number`);
  }
  if (!Number.isInteger(time)) {
    throw new Error(`Time argument hast to be integer`);
  }
  return {
    time,
    tick() {
      if (this.time > 0) {
        this.time--;
      }
      if (this.time === 0) {
        return `Time is over!`;
      }
      return this.time;
    }
  };
};

export default timer;

