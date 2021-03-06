import React from 'react';
import PropTypes from 'prop-types';

import Grid from './grid.jsx';
import EndGame from './endgame/endgame.jsx';
import Snake from '../../js/views/snake.js';
import Food from '../../js/views/food.js';
import Rules from '../../js/rules.js';
import { MOVE_DIRECTION } from '../../js/utils.js';


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
      over: false,
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

    this._startNewGame = this._startNewGame.bind(this);
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
      width: this._width,
      height: this._height,
      cellSize: this._cellSize,
      shift: this._cellSize,
      onMove: this._snakeWasUpdated,
    };
    this._snake = new Snake(snakeSettings);
  }

  _snakeWasUpdated() {
    this._handleGameRules();
    this._refreshGrid();
  }

  _handleGameRules() {
    this._rules._check();
    const isOver = this._rules._getGameOverIndicator();
    if (isOver) {
      this._endCurrentGame();
    }
    this._score = this._snake.getSize();
  }

  _endCurrentGame() {
    this._snake.stop();
    this.setState({
      over: true,
    });
  }

  _refreshGrid() {
    this.setState({
      snake: this._snake.getAllCoords(),
      food: this._food.getAllCoords(),
    });
  }

  _startNewGame() {
    this.setState({
      over: false,
    });

    this._initSnake();
    this._food.replace();
    this._rules._update({
      food: this._food,
      snake: this._snake,
    });
    this._refreshGrid();

    this._runSnake();
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

  componentDidMount() {
    this._runSnake();
  }

  _runSnake() {
    this._snakeFirstCoords = this._snake.getFirstCoords();
    this._foodFirstCoords = this._food.getFirstCoords();
    if (this._snakeFirstCoords.x !== this._foodFirstCoords.x) {
      this._runSnakeHorizontally();
    } else {
      /* В 99.9% случаев не вызывается */
      this._runSnakeVertically();
    }
  }

  _runSnakeHorizontally() {
    const { left, right } = MOVE_DIRECTION;

    if (this._snakeFirstCoords.x < this._foodFirstCoords.x) {
      this._snake.startMove(right);
    } else {
      this._snake.startMove(left);
    }
  }

  _runSnakeVertically() {
    const { top, bottom } = MOVE_DIRECTION;

    if (this._snakeFirstCoords.y < this._foodFirstCoords.y) {
      this._snake.startMove(bottom);
    } else {
      this._snake.startMove(top);
    }
  }

  shouldComponentUpdate(_, nextState) {
    this._snakeView.coords = nextState.snake;
    this._foodView.coords = nextState.food;
    return true;
  }

  render() {
    return (
      <section style={this._style}>
        <Grid {...this._gridProps}/>
        <EndGame init={this.state.over}
                 onStartNewGame={this._startNewGame}
                 score={this._score}>
        </EndGame>
      </section>
    );
  }
}

Game.propTypes = {
  w: PropTypes.string,
  h: PropTypes.string,
};


export default Game;
