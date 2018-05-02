const getTimer = (time) => {
  if (typeof time !== `number`) {
    throw new Error(`Time should be of type number`);
  }
  if (!Number.isInteger(time)) {
    throw new Error(`Time should be integer number`);
  }
  if (time < 0) {
    throw new Error(`Time should not be negative value`);
  }
  return {
    value: time,
    tick() {
      if (this.value > 0) {
        this.value--;
      }
      if (this.value === 0) {
        return `Time is over`;
      }
      return this.value;
    }
  };
};

export default getTimer;
