class Snake {
  constructor(initX = 0, initY = 0) {
    this.startX = initX;
    this.startY = initY;
    this.length = 1;
  }

  getStartX() {
    return this.startX;
  }

  getStartY() {
    return this.startY;
  }
}

export default Snake;
