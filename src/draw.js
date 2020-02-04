import { log } from "./utils";

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

  log('frame');
}