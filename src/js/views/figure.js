import Point from './point.js';
import Randomizer from '../randomizer.js';


class Figure {
  constructor(settings) {
    this._body = [];
    this._randomizer = new Randomizer(settings);
    this._initFigure();
  }

  _initFigure() {
    const [x, y] = this._randomizer.randomize();
    this._body = [ new Point(x, y) ];
  }

  getAllCoords() {
    return this._body.map(point => point.getCoords());
  }

  getFirstCoords() {
    return this._body[0].getCoords();
  }

  _updateFirstCoords(coords) {
    this._body[0]._setCoords(coords.x, coords.y);
  }

  _updateCoordsOnIndex(coords, index) {
    if (index >= 0 && index < this._body.length) {
      this._body[index]._setCoords(coords.x, coords.y);
    }
  }

  _addPoint(x, y) {
    const point = new Point(x, y);
    this._body.push(point);
  }
}


export default Figure;
