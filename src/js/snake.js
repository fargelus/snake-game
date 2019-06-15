class Snake {
  constructor(settings) {
    this._startX = settings.initX;
    this._startY = settings.initY;
    this._moveShift = settings.moveShift;
    this._emitMove = settings.onMove;
    this._length = 1;

    this._handleArrowsPressed();
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

      this._move(arrowCodesToDirection[keyCode]);
    });
  }

  _move(direction) {
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

    this._emitMove();
  }

  _moveLeft() {
    this._startX -= this._moveShift;
  }

  _moveUp() {
    this._startY -= this._moveShift;
  }

  _moveRight() {
    this._startX += this._moveShift;
  }

  _moveDown() {
    this._startY += this._moveShift;
  }

  getStartX() {
    return this._startX;
  }

  getStartY() {
    return this._startY;
  }
}

export default Snake;
