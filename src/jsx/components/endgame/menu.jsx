import React from 'react';
import PropTypes from 'prop-types';

import ControlButton from './control_button.jsx';
import ScoreSaver from './score/saver.jsx';
import Board from './score/board.jsx';
import {resetObjectVals} from '../../../js/utils.js';
import BackArrow from '../../../assets/back-arrow.png';


class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'menu': true,
      'save_score': false,
      'scoreboard': false,
      'hide_scores': false
    };

    this.backBtnStyle = {
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: `url(${BackArrow}) no-repeat center, #e4e1e1`,
      minWidth: '50px',
      minHeight: '35px',
    };

    this._scoreSaved = false;
    this._renderComponent = null;

    this._renderMenuComponent = this._renderMenuComponent.bind(this);
    this._renderSaveScore = this._renderSaveScore.bind(this);
    this._renderScoreBoard = this._renderScoreBoard.bind(this);
    this._onScoreSaved = this._onScoreSaved.bind(this);
  }

  render() {
    this._defineRenderComponent();

    return (
      <div className={this.props.className}>
        <div className={this.state.hide_scores ? 'd-none' : 'mb-2'}>
          <div style={{textTransform: 'uppercase'}}>Game Over!</div>
          <div>Your score is {this.props.score}</div>
        </div>

        {this._renderComponent}
      </div>
    )
  }

  _defineRenderComponent() {
    if (this.state.menu) {
      this._renderComponent = this._buildMenuRenderComponent();
    } else {
      this._viewHasChanged = true;
      const btn = <div onClick={this._renderMenuComponent}>
                    <button style={this.backBtnStyle}></button>
                  </div>;

      const {save_score} = this.state;
      const componentToRender = save_score
                                ? this._buildSaveScoreRenderComponent()
                                : this._buildScoreBoard();

      this._renderComponent = <div>
                                {componentToRender}
                                {btn}
                              </div>
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
            action={this._renderSaveScore}>
            Save this score
          </ControlButton>

          <ControlButton
            action={this._renderScoreBoard}
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
    defaultState.hide_scores = true;
    this.setState(defaultState);
  }

  _renderScoreBoard() {
    const defaultState = resetObjectVals(this.state, false);
    defaultState.scoreboard = true;
    defaultState.hide_scores = true;
    this.setState(defaultState);
  }

  _buildSaveScoreRenderComponent() {
    return <ScoreSaver
            onSave={this._onScoreSaved}
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

Menu.propTypes = {
  startNewGameAction: PropTypes.func,
  score: PropTypes.number.isRequired,
  className: PropTypes.string,
  onViewChanged: PropTypes.func,
};


export default Menu;
