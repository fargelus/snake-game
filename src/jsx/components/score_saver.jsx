import React from 'react';
import PropTypes from 'prop-types';

import ControlButton from './control_button.jsx';

const ScoreSaver = (props) => {
  return (
    <div className="input-group">
      <input type="text" style={{height: 'auto'}} className="form-control" placeholder="Введите Ваше имя" />
      <div className="input-group-append">
        <ControlButton className="ml-2">
          Сохранить
        </ControlButton>
      </div>
    </div>
  );
}

export default ScoreSaver;
