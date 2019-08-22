import Figure from './figure.js';

class Food extends Figure {
  constructor(settings) {
    super(settings);
  }

  replace() {
    const [x, y] = this._randomizeConsiderLimit();
    const coords = {x, y};
    this._updateFirstCoords(coords);
  }
}


export default Food;
