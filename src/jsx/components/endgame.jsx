import React from 'react';
import PropTypes from 'prop-types';

import ControlButton from './control_button.jsx';
import { CSSTransition } from "react-transition-group";
import '../../styles/transition.css';

const EndGame = (props) => {
  if (!props.init) {
    return null;
  }

  const baseParentStyle = {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
    color: 'white',
    background: 'rgba(0, 0, 0, 0.8)',
  };

  return (
          <div>
            <CSSTransition
                in={true}
                timeout={400}
                classNames="curtain"
                unmountOnExit
                appear
              >
              <div className="d-flex flex-column justify-content-center align-items-center"
                style={baseParentStyle}>
                  <div style={{textTransform: 'uppercase'}}>Game Over!</div>
                  <div>Your score is {props.score}</div>
                  <div className="d-flex flex-column mt-3">
                    <ControlButton action={props.onStartNewGame} className="mb-3 align-self-center">Start new game</ControlButton>
                    <div className="d-flex">
                      <ControlButton>Save this score</ControlButton>
                      <ControlButton className="ml-3">View scoreboard</ControlButton>
                    </div>
                  </div>
                </div>
          </CSSTransition>
        </div>
        );
};

EndGame.propTypes = {
  score: PropTypes.number.isRequired,
  onStartNewGame: PropTypes.func,
  init: PropTypes.bool.isRequired,
};

export default EndGame;
