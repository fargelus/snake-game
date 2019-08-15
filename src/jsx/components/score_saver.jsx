import React from 'react';
import PropTypes from 'prop-types';

import ControlButton from './control_button.jsx';


class ScoreSaver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this._handleUsernameChange = this._handleUsernameChange.bind(this);
    this._sendSubmitRequest = this._sendSubmitRequest.bind(this);
  }

  _handleUsernameChange(ev) {
    this.setState({
      username: ev.target.value
    });
  }

  _sendSubmitRequest(ev) {
    ev.preventDefault();
    if (!this.state.username) return;

    const sendData = this._makeSendData();
    (async () => {
      await fetch('/save_score', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: sendData,
      });
    })();
  }

  _makeSendData() {
    const sendData = {
      name: this.state.username,
      score: this.props.score,
    };
    return JSON.stringify(sendData);
  }

  render() {
    return (
      <form method="post" name="save_score" onSubmit={this._sendSubmitRequest}>
        <div className="input-group">
          <input type="text"
                 style={{height: 'auto'}}
                 className="form-control"
                 placeholder="Введите Ваше имя"
                 onChange={this._handleUsernameChange}
                 value={this.state.username}/>
          <div className="input-group-append">
            <ControlButton className="ml-2">
              Сохранить
            </ControlButton>
          </div>
        </div>
      </form>
    );
  }
}

ScoreSaver.propTypes = {
  score: PropTypes.number.isRequired,
};

export default ScoreSaver;
