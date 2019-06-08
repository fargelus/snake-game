import React from 'react';
import ReactDOM from 'react-dom';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.ctx;
    this.width = +this.props.width || 640;
    this.height = +this.props.height || 480;
    this.cellSize = +this.props.cellSize || 20;

    this.attrs = Object.assign({}, this.props);
    this.removeCustomAttrs();
  }

  removeCustomAttrs() {
    this.mapCustomAttrsToReal();
    this.filterEmptyAttrs();
  }

  mapCustomAttrsToReal() {
    const customPropsToReal = {
      w: 'width',
      h: 'height',
      cellSize: '',
    };

    Object.keys(customPropsToReal).forEach((customProp) => {
      if (customProp in this.attrs) {
        const realProp = customPropsToReal[customProp];
        const propVal = this.attrs[customProp];
        this.attrs[realProp] = propVal;

        delete this.attrs[customProp];
      }
    });
  }

  filterEmptyAttrs() {
    Object.keys(this.attrs).forEach(attr => {
      if (!attr) {
        delete this.attrs[attr];
      }
    });
  }

  componentDidMount() {
    this.createGrid();
  }

  createGrid() {
    this.setupContext();
    this.drawVerticalLines();
    this.drawHorizontalLines();
  }

  setupContext() {
    const cnv = this.refs.cnv;
    this.ctx = cnv.getContext('2d');
    this.ctx.strokeStyle = '#4f4d4d';
  }

  drawVerticalLines() {
    const { width, height, cellSize } = this;

    this.ctx.beginPath();
    for(let i = 0; i <= width; i += cellSize) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, height);
      this.ctx.stroke();
    }
    this.ctx.stroke(); // Последняя линия
    this.ctx.closePath();
  }

  drawHorizontalLines() {
    const { width, height, cellSize } = this;

    this.ctx.beginPath();
    for(let i = 0; i <= height; i += cellSize) {
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(width, i);
      this.ctx.stroke();
    }
    this.ctx.stroke(); // Последняя линия
    this.ctx.closePath();
  }

  render() {
    return <canvas ref="cnv" {...this.attrs}></canvas>;
  }
}

export default Grid;
