import React from 'react';
import PropTypes from 'prop-types';

import ControlButton from './control_button.jsx';
import ScoreSaver from './score_saver.jsx';
import {resetObjectVals} from '../../js/utils.js';


class EndGameControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'buttons': true,
      'save_score': false,
      'scoreboard': false,
    };

    this._renderComponent = null;
  }

  _renderSaveScore() {
    const defaultState = resetObjectVals(this.state, false);
    defaultState.save_score = true;
    this.setState(defaultState);
  }

  _defineRenderComponent() {
    console.log(this.state);
    if (this.state.buttons) {
      this._renderComponent = (
        <div className="d-flex flex-column">
          <ControlButton action={this.props.startNewGameAction}
            className="mb-3 align-self-center">
              Start new game
          </ControlButton>
          <div className="d-flex">
            <ControlButton action={this._renderSaveScore.bind(this)}>
              Save this score
            </ControlButton>
            <ControlButton className="ml-3">View scoreboard</ControlButton>
          </div>
      </div>
    );
    } else if (this.state.save_score) {
      this._renderComponent = <ScoreSaver />;
    }
  }

  render() {
    console.log('IN RENDER');
    this._defineRenderComponent();

    return (
      <div className={this.props.className}>
        {this._renderComponent}
      </div>
    )
  }
}

EndGameControls.propTypes = {
  startNewGameAction: PropTypes.func,
};

export default EndGameControls;
