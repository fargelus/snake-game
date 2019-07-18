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

  getFirstCoords() {
    return this._body[0].getCoords();
  }

  _updateHeadCoords(coords) {
    this._body[0]._setCoords(coords.x, coords.y);
  }

  _updateCoordsOnIndex(coords, index) {
    if (index > 0 && index < this._body.length) {
      this._body[index]._setCoords(coords.x, coords.y);
    }
  }

  _addPoint(x, y) {
    const point = new Point(x, y);
    this._body.push(point);
  }
}

export default Figure;
