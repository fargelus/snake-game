import Point from './point.js';

class Food extends Point {
  constructor(width, height) {
    const randomX = Food.random(width);
    const randomY = Food.random(height);
    super(randomX, randomY);
  }

  static random(upperBound) {
    return Math.floor(Math.random() * upperBound);
  }

  updatePosition() {
    this._x = Food.random(width);
    this._y = Food.random(height);
  }
}

export default Food;
