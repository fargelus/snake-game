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

  _getHeadCoords() {
    return this._body[0].getCoords();
  }

  _updateHeadCoords(coords) {
    this._body[0]._setCoords(coords.x, coords.y);
  }

  _addPoint(x, y) {
    const point = new Point(x, y);
    this._body.push(point);
  }
}

export default Figure;
