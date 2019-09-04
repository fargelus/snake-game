import Figure from './figure.js';

class Food extends Figure {
  constructor(settings) {
    super(settings);
  }

  replace() {
    this._initFigure();
  }
}


export default Food;
