import { isCoordsAreEqual } from './utils.js';


class Rules {
  constructor(params) {
    this._snake = params.snake;
    this._food = params.food;
    this._width = params.width;
    this._height = params.height;
    this._gameOver = false;
  }

  _check() {
    if (this._isSnakeSwallowTheBait()) {
      this._snake.feed();
      this._food.replace();
    } else if (this._isEndGame()) {
      this._gameOver = true;
    }
  }

  _isSnakeSwallowTheBait() {
    const snakeCoords = this._snake.getFirstCoords();
    const foodCoords = this._food.getFirstCoords();

    return isCoordsAreEqual(snakeCoords, foodCoords);
  }

  _isEndGame() {
    return this._isSnakeBreaksWall() || this._isSnakeEatHerself();
  }

  _isSnakeBreaksWall() {
    return this._isSnakeBreaksHorizon() || this._isSnakeBreaksVertical();
  }

  _isSnakeBreaksHorizon() {
    const snakeHeadCoords = this._snake.getFirstCoords();
    const { x } = snakeHeadCoords;
    const boundX = this._width;
    return x < 0 || x >= boundX;
  }

  _isSnakeBreaksVertical() {
    const snakeHeadCoords = this._snake.getFirstCoords();
    const { y } = snakeHeadCoords;
    const boundY = this._height;
    return y < 0 || y >= boundY;
  }

  _isSnakeEatHerself() {
    const snakeCoords = this._snake.getAllCoords();

    for (let i = 0; i < snakeCoords.length - 1; ++i) {
      const comparedCoords = snakeCoords[i];
      for(let j = i + 1; j < snakeCoords.length; ++j) {
          const iteratedCoords = snakeCoords[j];
          if (isCoordsAreEqual(comparedCoords, iteratedCoords)) {
            this._gameOver = true;
            return;
          }
      }
    }
  }

  _getGameOverIndicator() {
    return this._gameOver;
  }

  _update(entities) {
    this._food = entities.food;
    this._snake = entities.snake;
    this._gameOver = false;
  }
}


export default Rules;
