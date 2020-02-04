import log from './utils';

export class Source {
  constructor(options) {
    this.options = options;
    this.draw = this.options.draw;
    this.grid = [];
    // this.render = this.render.bind(this);
    // this.state = this.state.bind(this);
    // this.start = this.start.bind(this);
    // this.toggleStop = this.toggleStop.bind(this);
    // this.createGrid = this.createGrid.bind(this);
    // this.setCanvas = this.setCanvas.bind(this);
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
}