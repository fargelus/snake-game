import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './grid.jsx';
import Snake from '../../js/snake.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    const width = props.w;
    const height = props.h;
    const snake = new Snake(width/2, height/2);

    this.gridProps = {
      w: width,
      h: height,
      figures: [
          {
            x: snake.getStartX(),
            y: snake.getStartY(),
            color: '#f00',
          },
        ],
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    };
  }

  render() {
    return (<section>
                <Grid {...this.gridProps}/>
            </section>);
  }
}

export default Game;
