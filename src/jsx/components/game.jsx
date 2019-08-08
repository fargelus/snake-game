import React from 'react';
import Grid from './grid.jsx';
import EndGame from './endgame.jsx';
import Snake from '../../js/views/snake.js';
import Food from '../../js/views/food.js';
import Rules from '../../js/rules.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this._width = props.w || 640;
    this._height = props.h || 480;
    this._cellSize = 20;

    this._snake;
    this._snakeWasUpdated = this._snakeWasUpdated.bind(this);

    this._food;
    this._initFood();

    this._initSnake();

    const rulesParams = {
      snake: this._snake,
      food: this._food,
      width: this._width,
      height: this._height
    };
    this._rules = new Rules(rulesParams);
    this._score = 0;

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

    this._gameOver = false;
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
      onMove: this._snakeWasUpdated,
    };
    this._snake = new Snake(snakeSettings);
  }

  _snakeWasUpdated() {
    this._handleGameRules();

    this.setState({
      snake: this._snake.getAllCoords(),
      food: this._food.getAllCoords(),
    });
  }

  _handleGameRules() {
    this._rules._check();
    this._gameOver = this._rules._getGameOverIndicator();
    if (this._gameOver) {
      this._endCurrentGame();
    }
    this._score = this._snake.getSize();
  }

  _endCurrentGame() {
    this._snake.stop();
  }

  _startNewGame() {
    console.log('In parent!!!');
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
    this._snakeView.coords = nextState.snake;
    this._foodView.coords = nextState.food;
    return true;
  }

  render() {
    this._gameOver = true;
    return (<section style={this._style}>
              <Grid {...this._gridProps}/>
              {
                this._gameOver
                ? <EndGame onStartNewGame={this._startNewGame.bind(this)} score={this._score}/>
                : null
              }
            </section>);
  }
}

export default Game;
