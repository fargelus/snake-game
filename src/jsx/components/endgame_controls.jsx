import React from 'react';
import PropTypes from 'prop-types';

import ControlButton from './control_button.jsx';
import ScoreSaver from './score_saver.jsx';
import {resetObjectVals} from '../../js/utils.js';


class EndGameControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'menu': true,
      'save_score': false,
      'scoreboard': false,
    };

    this._scoreSaved = false;
    this._renderComponent = null;
  }

  _renderSaveScore() {
    const defaultState = resetObjectVals(this.state, false);
    defaultState.save_score = true;
    this.setState(defaultState);
  }

  _onScoreSaved() {
    this._scoreSaved = true;
    this._renderMenuComponent();
  }

  _renderMenuComponent() {
    const defaultState = resetObjectVals(this.state, false);
    defaultState.menu = true;
    this.setState(defaultState);
  }

  _defineRenderComponent() {
    if (this.state.menu) {
      this._renderComponent = this._buildMenuRenderComponent();
    } else if (this.state.save_score) {
      this._renderComponent = this._buildSaveScoreRenderComponent();
    }
  }

  _buildMenuRenderComponent() {
    return (
      <div className="d-flex flex-column">
        <ControlButton action={this.props.startNewGameAction}
          className="mb-3 align-self-center">
            Start new game
        </ControlButton>
        <div className="d-flex">
          <ControlButton
            disabled={this._scoreSaved}
            action={this._renderSaveScore.bind(this)}>
            Save this score
          </ControlButton>
          <ControlButton className="ml-3">View scoreboard</ControlButton>
        </div>
    </div>
    );
  }

  _buildSaveScoreRenderComponent() {
    return <ScoreSaver
            onSave={this._onScoreSaved.bind(this)}
            score={this.props.score}/>;
  }

  render() {
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
  score: PropTypes.number.isRequired,
};


export default EndGameControls;
