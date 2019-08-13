import React from 'react';

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

    (async () => {
      await fetch('/save_score', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: "{'a': 1}"
      });
    })();
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


export default ScoreSaver;
