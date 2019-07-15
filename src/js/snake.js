import Figure from './figure.js';

class Snake extends Figure {
  constructor(settings) {
    super(settings.x * 1.5, settings.y);

    this._shift = settings.shift;
    this._emitMove = settings.onMove;
    this._moveDirection;

    this._handleArrowsPressed();
    this._moveIntervalID;
  }

  stop() {
    this._clearMoveIntervalID();
  }

  _clearMoveIntervalID() {
    if (this._moveIntervalID) {
      clearInterval(this._moveIntervalID);
    }
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
      const code = '' + e.keyCode;
      const isArrowPressed = arrowCodes.includes(code);
      if (!isArrowPressed) {
        return;
      }

      const newDirection = arrowCodesToDirection[code];
      if (this._isDirectionAllowed(newDirection)) {
        this._moveDirection = newDirection;
        this._turn();
      }
    });
  }

  _isDirectionAllowed(direction) {
    return this._notSameDirection(direction) && this._notOppositeDirection(direction);
  }

  _notSameDirection(direction) {
    return direction !== this._moveDirection;
  }

  _notOppositeDirection(direction) {
    const oppositeDirections = {
      left: 'right',
      up: 'down',
      right: 'left',
      down: 'up',
    };

    if (this._moveDirection in oppositeDirections) {
      const oppositeDirection = oppositeDirections[this._moveDirection];
      return direction !== oppositeDirection;
    }

    return true;
  }

  _turn() {
    switch (this._moveDirection) {
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
      this._moveHead(-this._shift, 0);
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

  _moveHead(valueX, valueY) {
    const coords = this.getHeadCoords();
    coords.x += valueX;
    coords.y += valueY;
    this._updateHeadCoords(coords);
  }

  _moveUp() {
    this._move(() => {
      this._moveHead(0, -this._shift);
    });
  }

  _moveRight() {
    this._move(() => {
      this._moveHead(this._shift, 0);
    });
  }

  _moveDown() {
    this._move(() => {
      this._moveHead(0, this._shift);
    });
  }
}

export default Snake;
