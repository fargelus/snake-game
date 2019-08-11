import React from 'react';
import PropTypes from 'prop-types';

import { deepCopyObj } from '../../js/utils.js';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this._ctx;
    this._width = +this.props.w;
    this._height = +this.props.h;
    this._cellSize = +this.props.cellSize;

    this._oldViews;
    this._views;

    this._attrs;
    this._setupAttrs();
  }

  _setupAttrs(props) {
    const passedProps = props || this.props;
    this._attrs = deepCopyObj(passedProps);
    this._removeCustomAttrs();
  }

  _removeCustomAttrs() {
    this._mapCustomAttrsToReal();
    this._filterEmptyAttrs();
  }

  _mapCustomAttrsToReal() {
    const customPropsToReal = {
      w: 'width',
      h: 'height',
      cellSize: '',
    };

    Object.keys(customPropsToReal).forEach((customProp) => {
      if (customProp in this._attrs) {
        const realProp = customPropsToReal[customProp];
        const propVal = this._attrs[customProp];
        this._attrs[realProp] = propVal;

        delete this._attrs[customProp];
      }
    });
  }

  _filterEmptyAttrs() {
    Object.keys(this._attrs).forEach(attr => {
      if (!attr) {
        delete this._attrs[attr];
      }
    });
  }

  componentDidMount() {
    this._createGrid();
  }

  _createGrid() {
    this._setupContext();
    this._drawVerticalLines();
    this._drawHorizontalLines();
    this._drawViews();
  }

  _setupContext() {
    const cnv = this.refs.cnv;
    this._ctx = cnv.getContext('2d');
    this._ctx.strokeStyle = '#4f4d4d';
  }

  _drawVerticalLines() {
    const { _width, _height, _cellSize } = this;

    this._ctx.beginPath();
    for(let i = 0; i <= _width; i += _cellSize) {
      this._ctx.moveTo(i, 0);
      this._ctx.lineTo(i, _height);
      this._ctx.stroke();
    }
    this._ctx.stroke(); // Последняя линия
    this._ctx.closePath();
  }

  _drawHorizontalLines() {
    const { _width, _height, _cellSize } = this;

    this._ctx.beginPath();
    for(let i = 0; i <= _height; i += _cellSize) {
      this._ctx.moveTo(0, i);
      this._ctx.lineTo(_width, i);
      this._ctx.stroke();
    }
    this._ctx.stroke(); // Последняя линия
    this._ctx.closePath();
  }

  _drawViews() {
    this._updateViews();
    if (!this._views.length) return;

    this._resetOldViewsIfItExist();
    this._views.forEach((view) => {
      this._setViewColor(view);
      this._fillViewRects(view);
    });
  }

  _updateViews() {
    this._saveOldViews();
    this._initViews();
  }

  _saveOldViews() {
    const isArray = Array.isArray;
    this._oldViews = isArray(this._views) ? deepCopyObj(this._views) : [];
  }

  _initViews() {
    this._views = this._attrs.views || [];
  }

  _resetOldViewsIfItExist() {
    if (!this._oldViews.length) return;

    this._oldViews.forEach((oldView) => {
      this._clearViewRects(oldView);
    });
  }

  _clearViewRects(view) {
    const { _ctx, _cellSize } = this;
    const { coords: coordsArr } = view;

    coordsArr.forEach((coords) => {
      const rectCoords = this._getRectCoords(coords.x, coords.y, _cellSize);
      _ctx.clearRect(...rectCoords);
    });
  }

  _setViewColor(view) {
    this._ctx.fillStyle = view.color;
  }

  _fillViewRects(view) {
    const { _ctx, _cellSize } = this;

    const { coords: coordsArr } = view;
    coordsArr.forEach((coords) => {
      const rectCoords = this._getRectCoords(coords.x, coords.y, _cellSize);
      _ctx.fillRect(...rectCoords);
    });
  }

  _getRectCoords(x, y, size) {
    return [x + 1, y + 1, size - 2, size - 2 ];
  }

  shouldComponentUpdate(newProps) {
    this._setupAttrs(newProps);
    this._drawViews();
    return true;
  }

  render() {
    return <canvas ref="cnv" {...this._attrs}></canvas>;
  }
}

Grid.propTypes = {
  w: PropTypes.string.isRequired,
  h: PropTypes.string.isRequired,
  cellSize: PropTypes.number.isRequired
};

export default Grid;
