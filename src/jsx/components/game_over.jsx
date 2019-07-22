import React from 'react';
import PropTypes from 'prop-types';

class GameOver extends React.Component {
  constructor(props) {
    super(props);

    this.rootStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: '0',
      top: '0',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.8)',
    };

    this.btnWrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
    };

    this.btnStyle = {
      display: 'block',
      marginTop: '10px',
      padding: '10px',
      border: '0',
      background: '#2727bd',
      color: 'white',
      borderRadius: '3px',
      fontSize: '14px',
      cursor: 'pointer',
    };
  }

  render() {
    return (
      <div style={this.rootStyle}>
        <div style={{textTransform: 'uppercase'}}>The game is over.</div>
        <div>Your score is {this.props.score}</div>
        <div style={this.btnWrapperStyle}>
          <button style={this.btnStyle}>Save this score</button>
          <button style={this.btnStyle}>Start new game</button>
        </div>
      </div>
    );
  }
}

GameOver.propTypes = {
  score: PropTypes.string.isRequired,
};

export default GameOver;
