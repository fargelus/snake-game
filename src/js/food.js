import Figure from './figure.js';

class Food extends Figure {
  constructor(settings) {
    super();

    this._lastX = settings.width;
    this._lastY = settings.height;
    this._limit = settings.cellSize;
    this._point;

    this._randomX;
    this._randomY;
    this._randomize();

    const [x, y] = this._considerLimit();
    this._addPoint(x, y);
  }

  _randomize() {
    this._randomX = Math.floor(Math.random() * this._lastX);
    this._randomY = Math.floor(Math.random() * this._lastY);
  }

  _considerLimit() {
    const realX = this._roundByLimit(this._randomX);
    const realY = this._roundByLimit(this._randomY);

    return [ realX, realY ];
  }

  _roundByLimit(val) {
    return Math.floor(val / this._limit) * this._limit;
  }
}

export default Food;
