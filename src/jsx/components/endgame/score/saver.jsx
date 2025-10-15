import React from 'react';
import PropTypes from 'prop-types';

import ControlButton from '../control_button.jsx';


class ScoreSaver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this._handleUsernameChange = this._handleUsernameChange.bind(this);
    this._save = this._save.bind(this);
  }

  _handleUsernameChange(ev) {
    this.setState({
      username: ev.target.value
    });
  }

  _save(ev) {
    ev.preventDefault();
    if (!this.state.username) return;
    
    const currentScore = {
      name: this.state.username,
      score: this.props.score,
    };
    const scores = JSON.parse(localStorage.getItem('snake-game:score:board') || '[]');
    scores.push(currentScore);
    localStorage.setItem('snake-game:score:board', JSON.stringify(scores));
    this.props.onSave();
  }

  render() {
    return (
      <form method="post" name="save_score" onSubmit={this._save}>
        <div className="input-group">
          <input type="text"
                 style={{height: 'auto'}}
                 className="form-control"
                 required
                 placeholder="Enter your name"
                 onChange={this._handleUsernameChange}
                 value={this.state.username}/>
          <div className="input-group-append">
            <ControlButton className="ml-2">
              Save
            </ControlButton>
          </div>
        </div>
      </form>
    );
  }
}

ScoreSaver.propTypes = {
  score: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ScoreSaver;
