import { log } from './utils';
import { source, snake, apples } from './index';

export function draw() {
  clearCanvas(this.options.renderElement, this.options.context);

  drawGrid();

  for(let i = apples.length - 1; i >= 0; i -= 1) {
    apples[i].draw();
  }

  snake.checkBites();
  snake.eat();
  snake.teleport();
  snake.move();
  snake.draw();

  //log('frame');
}

function clearCanvas(canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
  for(let y = 0; y < source.grid.length; y += 1) {
    for(let x = 0; x < source.grid[y].length; x += 1) {
      source.grid[y][x].draw();
    }
  }
}