import Figure from './figure.js';

class Snake extends Figure {
  constructor(settings) {
    super(settings.x * 1.5, settings.y);

    this._shift = settings.shift;
    this._emitMove = settings.onMove;
    this._moveDirection;
    this._frozenCoords;

    this._handleKeyDown();
    this._moveIntervalID;
  }

  feed() {
    const lastCoords = this.getAllCoords().slice(-1)[0];
    const newCoords = {};
    switch (this._moveDirection) {
      case 'left':
        newCoords.x = lastCoords.x + this._shift;
        newCoords.y = lastCoords.y;
        break;

      case 'right':
        newCoords.x = lastCoords.x - this._shift;
        newCoords.y = lastCoords.y;
        break;

      case 'up':
        newCoords.x = lastCoords.x;
        newCoords.y = lastCoords.y + this._shift;
        break;

      case 'down':
        newCoords.x = lastCoords.x;
        newCoords.y = lastCoords.y - this._shift;
        break;
      default:
        break;
    }

    this._addPoint(newCoords.x, newCoords.y);
  }

  stop() {
    this._clearMoveIntervalID();
    window.removeEventListener('keydown', this._defineMoveDirection);
  }

  _defineMoveDirection(e) {
    const arrowCodesToDirection = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };
    const arrowCodes = Object.keys(arrowCodesToDirection);

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
  }

  getSize() {
    return this.getAllCoords().length - 1;
  }

  _clearMoveIntervalID() {
    if (this._moveIntervalID) {
      clearInterval(this._moveIntervalID);
    }
  }

  _handleKeyDown() {
    this._defineMoveDirection = this._defineMoveDirection.bind(this);
    window.addEventListener('keydown', this._defineMoveDirection);
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
      self._frozenCoords = this.getFirstCoords();
      callback();
      self._moveTail();
      self._emitMove();
    }
    moveFunc();

    this._moveIntervalID = setInterval(moveFunc, 200);
  }

  _moveTail() {
    const allCoordsExceptFirst = this.getAllCoords().slice(1);
    allCoordsExceptFirst.forEach((coords, index) => {
      const { x, y } = coords;
      this._updateCoordsOnIndex(this._frozenCoords, index + 1);
      this._frozenCoords.x = x;
      this._frozenCoords.y = y;
    });
  }

  _moveHead(valueX, valueY) {
    const coords = this.getFirstCoords();
    coords.x += valueX;
    coords.y += valueY;
    this._updateFirstCoords(coords);
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
