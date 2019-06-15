import React from 'react';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this._ctx;
    this._width = +this.props.w;
    this._height = +this.props.h;
    this._cellSize = +this.props.cellSize;

    this._figures;
    this._attrs;
    this._setupAttrs();
  }

  _setupAttrs(props) {
    const passedProps = props || this.props;
    this._attrs = Object.assign({}, passedProps);
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
    this._drawFigures();
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

  _drawFigures() {
    this._initFigures();
    if (!this._figures.length) return;

    this._figures.forEach((figure) => {
      const { coords, color } = figure;
      const { _ctx, _cellSize } = this;
      _ctx.fillStyle = color;
      _ctx.fillRect(coords.x, coords.y, _cellSize, _cellSize);
    });
  }

  _initFigures() {
    this._figures = this._attrs.figures || [];
  }

  shouldComponentUpdate(newProps) {
    this._setupAttrs(newProps);
    this._drawFigures();
    return true;
  }

  render() {
    return <canvas ref="cnv" {...this._attrs}></canvas>;
  }
}

export default Grid;
