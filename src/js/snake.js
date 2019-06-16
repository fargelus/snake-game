import Point from './point.js';

class Snake extends Point {
  constructor(settings) {
    super(settings.x, settings.y);

    this._shift = settings.shift;
    this._emitMove = settings.onMove;
    this._length = 1;

    this._handleArrowsPressed();
    this._moveIntervalID;
  }

  _handleArrowsPressed() {
    const arrowCodesToDirection = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };
    const arrowCodes = Object.keys(arrowCodesToDirection);
    window.addEventListener('keydown', (e) => {
      let {keyCode} = e;
      keyCode = '' + keyCode;
      const isArrowPressed = arrowCodes.includes(keyCode);
      if (!isArrowPressed) {
        return;
      }

      this._turn(arrowCodesToDirection[keyCode]);
    });
  }

  _turn(direction) {
    switch (direction) {
      case 'left':
        this._moveLeft();
        break;
      case 'up':
        this._moveUp();
        break;
      case 'right':
        this._moveRight();
        break;
      case 'down':
        this._moveDown();
        break;
      default:
        break;
    }
  }

  _moveLeft() {
    this._move(() => {
      this._x -= this._shift;
    });
  }

  _move(callback) {
    this._clearMoveIntervalID();

    const self = this;
    const moveFunc = () => {
      callback();
      self._emitMove();
    }
    moveFunc();

    this._moveIntervalID = setInterval(moveFunc, 300);
  }

  _clearMoveIntervalID() {
    if (this._moveIntervalID) {
      clearInterval(this._moveIntervalID);
    }
  }

  _moveUp() {
    this._move(() => {
      this._y -= this._shift;
    });
  }

  _moveRight() {
    this._move(() => {
      this._x += this._shift;
    });
  }

  _moveDown() {
    this._move(() => {
      this._y += this._shift;
    });
  }
}

export default Snake;
