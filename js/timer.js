export class Timer {
  constructor(time) {
    this.time = time;
  }
  tick() {
    if (this.time > 0) {
      this.time--;
    }
    return this.time;
  }
}
