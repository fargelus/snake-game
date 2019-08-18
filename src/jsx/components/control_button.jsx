import React from 'react';
import PropTypes from 'prop-types';


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

  const attrs = Object.assign({}, props);
  attrs.style = btnStyle;
  delete attrs.action;

  return (
      <button
        {...attrs}
        onClick={props.action}>
        {props.children}
      </button>
  );
}

ControlButton.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  action: PropTypes.func,
};


export default ControlButton;
