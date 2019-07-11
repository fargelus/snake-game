import Point from './point.js';

class Figure {
  constructor(x, y) {
    this._body = [];
    if (x && y) {
      this._body = [ new Point(x, y) ];
    }
  }

  getAllCoords() {
    return this._body.map(point => point.getCoords());
  }

  _addPoint(x, y) {
    const point = new Point(x, y);
    this._body.push(point);
  }
}

export default Figure;
