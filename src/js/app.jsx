import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/grid.jsx';

ReactDOM.render(
  <Grid w="640" h="480" cellSize="20"/>,
  document.getElementById('app')
);
