class Randomizer {
  constructor(settings) {
    this._width = settings.width;
    this._height = settings.height;
    this._limit = settings.cellSize;

    this._randomX;
    this._randomY;
  }

  randomize() {
    this._randomX = Math.floor(Math.random() * this._width);
    this._randomY = Math.floor(Math.random() * this._height);

    return this._considerLimit();
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


export default Randomizer;
