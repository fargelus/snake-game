import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from "react-transition-group";
import '../../styles/transition.css';


const EndGame = (props) => {
  const baseParentStyle = {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 0,
    color: 'white',
    background: 'rgba(0, 0, 0, 0.8)',
  };

  const btnStyle = {
    padding: '10px',
    border: '0',
    background: '#2727bd',
    color: 'white',
    borderRadius: '3px',
    fontSize: '14px',
    cursor: 'pointer',
    fontStyle: 'italic',
    textTransform: 'capitalize',
    letterSpacing: '0.8px',
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
                  <div style={{textTransform: 'uppercase'}}>Game Over.</div>
                  <div>Your score is {props.score}</div>
                  <div className="d-flex flex-column mt-2">
                    <div className="d-flex">
                      <button className="d-block" style={btnStyle}>Save this score</button>
                      <button className="d-block ml-3" style={btnStyle}>View scoreboard</button>
                    </div>

                    <button className="d-block mt-2 align-self-center" style={btnStyle}>Start new game</button>
                  </div>
                </div>
          </CSSTransition>
        </div>
        );
};


export default EndGame;
