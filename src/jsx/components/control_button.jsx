import React from 'react';

const ControlButton = (props) => {
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
    display: 'block',
  };

  return (
      <button className={props.className} style={btnStyle} onClick={props.action}>
        {props.children}
      </button>
  );
}

export default ControlButton;
