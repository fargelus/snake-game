import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from "react-transition-group";

import '../../../styles/transition.css';
import Menu from './menu.jsx';


const EndGame = (props) => {
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
                in={props.init}
                timeout={650}
                classNames="curtain"
                unmountOnExit
                appear
              >
              <div style={baseParentStyle}
                   className="d-flex align-items-center justify-content-center">
                  <Menu
                    score={props.score}
                    startNewGameAction={props.onStartNewGame}
                    className="d-flex flex-column justify-content-center align-items-center"
                    />
                </div>
          </CSSTransition>
        </div>
  );
}

EndGame.propTypes = {
  score: PropTypes.number.isRequired,
  onStartNewGame: PropTypes.func,
  init: PropTypes.bool.isRequired,
};


export default EndGame;
