import {wait, log, handleClick} from './utils';
import { Tile } from './objects';

export class Source {
  constructor(options) {
    this.options = options;
    this.draw = this.options.draw;
    this.grid = [];
  }

  createGrid() {
    for(let y = 0; y < this.options.gridHeight; y += 1) {
      this.grid[y] = [];
      for(let x = 0; x < this.options.gridWidth; x += 1) {
        this.grid[y][x] = new Tile(
          x * this.options.tileWidth,
          y * this.options.tileHeight,
          this.options.tileWidth,
          this.options.tileHeight,
          this.options.tileColor,
          this.options.context
        );
      }
    }
  }

  setCanvas() {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const tileWidth = (innerWidth > innerHeight) ?
      Math.ceil((innerHeight - innerHeight / this.options.controlsScreenPart) / this.options.gridWidth) :
      Math.ceil((innerWidth - innerWidth / this.options.controlsScreenPart) / this.options.gridHeight);
    const tileHeight = tileWidth;
    this.options.tileWidth = tileWidth;
    this.options.tileHeight = tileHeight;
    const canvasWidth = this.options.gridWidth * this.options.tileWidth;
    const canvasHeight = this.options.gridHeight * this.options.tileHeight;
    this.options.renderElement.width = canvasWidth;
    this.options.renderElement.height = canvasHeight;
  }

  state() {
    this.draw();
    this.options.testCounter = this.options.testCounter + 1;
  }

  render() {
    log(this.options.testCounter);
    if(this.options.testCounter >= this.options.testStopCounter) {
      this.options.testCounter = 0;
      if(this.options.debug) {
        this.toggleStop();
      }
    }
    if(this.options.isStopped) {
      log(`stopped = ${this.options.isStopped}`);
    } else {
      wait(this.options.rerenderTime)
        .then(() => this.state())
        .then(() => this.render());
    }
  }

  start() {
    this.render();
  }

  toggleStop() {
    const isStoppedBefore = this.options.isStopped;
    this.options.isStopped = !this.options.isStopped;
    if(isStoppedBefore) {
      this.start();
    }
  }

  createControls() {
    const controlsElement = document.getElementById('controls');
    const left = document.getElementById('left');
    const center = document.getElementById('center');
    const up = document.getElementById('up');
    const down = document.getElementById('down');
    const right = document.getElementById('right');
  
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const px = 'px';
    const calculatedHeight = (innerHeight - this.options.renderElement.height - 10) + px;
    controlsElement.style.height = left.style.height = center.style.height = right.style.height = calculatedHeight;
    const widthDividedByThree = Math.floor(innerWidth / 3) - 27 + px;
    left.style.width = center.style.width = right.style.width = widthDividedByThree;
    up.style.width = down.style.width = widthDividedByThree;
    up.style.height = down.style.height = Math.floor(parseInt(calculatedHeight) / 2 - 10) + px;
  
    controlsElement.addEventListener('click', handleClick, false);
  }
}