import React from 'react';
import Grid from './grid.jsx';
import Snake from '../../js/snake.js';
import Food from '../../js/food.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this._width = props.w || 640;
    this._height = props.h || 480;
    this._cellSize = 20;

    this._snake;
    this._moveSnake = this._moveSnake.bind(this);

    this._food;
    this._initFood();

    this._initSnake();

    /*
       Змейке задаем нач.координаты.
       Наживка сама генерирует свои координаты.
    */
    this.state = {
      snake: this._snake.getAllCoords(),
      food: this._food.getAllCoords(),
    };

    this._snakeView;
    this._foodView;
    this._views;
    this._initViews();

    this._gridProps;
    this._initGridProps();

    this._style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  _initFood() {
    const foodSettings = {
      width: this._width,
      height: this._height,
      cellSize: this._cellSize,
    };

    this._food = new Food(foodSettings);
  }

  _initSnake() {
    const snakeSettings = {
      x: this._width / 2,
      y: this._height / 2,
      shift: this._cellSize,
      onMove: this._moveSnake,
    };
    this._snake = new Snake(snakeSettings);
  }

  _moveSnake() {
    this.setState({
      snake: this._snake.getAllCoords(),
    });
  }

  _initViews() {
    this._snakeView = {
      coords: this._snake.getAllCoords(),
      color: '#f00',
    };

    this._foodView = {
      coords: this._food.getAllCoords(),
      color: '#663399',
    };

    this._views = [ this._foodView, this._snakeView ];
  }

  _initGridProps() {
    this._gridProps = {
      w: this._width,
      h: this._height,
      cellSize: this._cellSize,
      views: this._views,
    };
  }

  shouldComponentUpdate(_, nextState) {
    if (this._isSnakeBreaksWall()) {
      this._snake.stop();
      this._gameIsOver();
      return false;
    }

    this._snakeView.coords = nextState.snake;
    this._foodView.coords = nextState.food;
    return true;
  }

  _isSnakeBreaksWall() {
    return this._isSnakeBreaksHorizon() || this._isSnakeBreaksVertical();
  }

  _isSnakeBreaksHorizon() {
    const snakeHeadCoords = this._snake.getFirstCoords();
    const { x } = snakeHeadCoords;
    const boundX = this._width;
    return x === 0 || x >= boundX;
  }

  _isSnakeBreaksVertical() {
    const snakeHeadCoords = this._snake.getFirstCoords();
    const { y } = snakeHeadCoords;
    const boundY = this._height;
    return y === 0 || y >= boundY;
  }

  _gameIsOver() {
    alert('Game is over!');

    this._initSnake();
    this._food.replace();
    this.setState({
      snake: this._snake.getAllCoords(),
      food: this._food.getAllCoords(),
    });
  }

  render() {
    return (<section style={this._style}>
                <Grid {...this._gridProps}/>
            </section>);
  }
}

export default Game;
