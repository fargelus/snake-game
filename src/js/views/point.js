class Point {
  constructor(x=0, y=0) {
    this._x = x;
    this._y = y;
  }

  _setCoords(x, y) {
    this._x = x;
    this._y = y;
  }

  getCoords() {
    return {
      x: this._x,
      y: this._y
    };
  }
}


export default Point;
