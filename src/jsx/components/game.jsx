import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './grid.jsx';
import Snake from '../../js/snake.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this._width = props.w || 640;
    this._height = props.h || 480;
    this._cellSize = 20;

    this.state = {
      snake: {
        x: this._width/2,
        y: this._height/2,
      },
    };
    
    this._snake;
    this._moveSnake = this._moveSnake.bind(this);
    this._initSnake();

    this._gridProps;
    this._initGridProps();
  }

  _initSnake() {
    const snakeSettings = {
      initX: this.state.snake.x,
      initY: this.state.snake.y,
      moveShift: this._cellSize,
      onMove: this._moveSnake,
    };
    this._snake = new Snake(snakeSettings);
  }

  _moveSnake() {
    this.setState({
      snake: {
        x: this._snake.getStartX(),
        y: this._snake.getStartY(),
      },
    });
  }

  _initGridProps() {
    this._gridProps = {
      w: this._width,
      h: this._height,
      cellSize: this._cellSize,
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    };
  }

  render() {
    const fillParts = {
      figures: [{
        coords: this.state.snake,
        color: '#f00',
      }],
    };
    Object.assign(this._gridProps, fillParts);

    return (<section>
                <Grid {...this._gridProps}/>
            </section>);
  }
}

export default Game;
