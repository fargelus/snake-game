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

    this._food = new Food(this._width, this._height);
    const [foodX, foodY] = this._getFoodCoordsConsiderCellSize();

    this.state = {
      snake: {
        x: this._width/2,
        y: this._height/2,
      },
      food: {
        x: foodX,
        y: foodY,
      },
    };

    this._initSnake();

    this._gridProps;
    this._initGridProps();

    this._style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  _getFoodCoordsConsiderCellSize() {
    const coordX = this._food.getX();
    const foodX = this._roundByCellSize(coordX);

    const coordY = this._food.getY();
    const foodY = this._roundByCellSize(coordY);

    return [ foodX, foodY ];
  }

  _roundByCellSize(val) {
    return Math.floor(val / this._cellSize) * this._cellSize;
  }

  _initSnake() {
    const snakeSettings = {
      x: this.state.snake.x,
      y: this.state.snake.y,
      shift: this._cellSize,
      onMove: this._moveSnake,
    };
    this._snake = new Snake(snakeSettings);
  }

  _moveSnake() {
    this.setState({
      snake: {
        x: this._snake.getX(),
        y: this._snake.getY(),
      },
    });
  }

  _initGridProps() {
    this._gridProps = {
      w: this._width,
      h: this._height,
      cellSize: this._cellSize,
    };
  }

  render() {
    this._updateGridPropsByFigures();

    return (<section style={this._style}>
                <Grid {...this._gridProps}/>
            </section>);
  }

  _updateGridPropsByFigures() {
    const figuresCont = {
      figures: [
        {
          coords: this.state.snake,
          color: '#f00',
        },
        {
          coords: this.state.food,
          color: '#663399',
        }
      ],
    };
    Object.assign(this._gridProps, figuresCont);
  }
}

export default Game;
