import React from 'react';
import PropTypes from 'prop-types';

import ControlButton from './control_button.jsx';
import ScoreSaver from './score/saver.jsx';
import Board from './score/board.jsx';
import {resetObjectVals} from '../../../js/utils.js';


class Controls extends React.Component {
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

  render() {
    this._defineRenderComponent();

    return (
      <div className={this.props.className}>
        {this._renderComponent}
      </div>
    )
  }

  _defineRenderComponent() {
    if (this.state.menu) {
      this._renderComponent = this._buildMenuRenderComponent();
    } else if (this.state.save_score) {
      this._renderComponent = this._buildSaveScoreRenderComponent();
    } else {
      this._renderComponent = this._buildScoreBoard();
    }
  }

  _buildMenuRenderComponent() {
    return (
      <div className="d-flex flex-column">
        <ControlButton
          action={this.props.startNewGameAction}
          className="mb-3 align-self-center">
            Start new game
        </ControlButton>

        <div className="d-flex">
          <ControlButton
            disabled={this._scoreSaved}
            action={this._renderSaveScore.bind(this)}>
            Save this score
          </ControlButton>

          <ControlButton
            action={this._renderScoreBoard.bind(this)}
            className="ml-3">
              View scoreboard
          </ControlButton>
        </div>
    </div>
    );
  }

  _renderSaveScore() {
    const defaultState = resetObjectVals(this.state, false);
    defaultState.save_score = true;
    this.setState(defaultState);
  }

  _renderScoreBoard() {
    const defaultState = resetObjectVals(this.state, false);
    defaultState.scoreboard = true;
    this.setState(defaultState);
  }

  _buildSaveScoreRenderComponent() {
    return <ScoreSaver
            onSave={this._onScoreSaved.bind(this)}
            score={this.props.score}/>;
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

  _buildScoreBoard() {
    return <Board/>;
  }
}

Controls.propTypes = {
  startNewGameAction: PropTypes.func,
  score: PropTypes.number.isRequired,
};


export default Controls;
