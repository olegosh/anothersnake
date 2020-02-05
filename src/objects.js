import { log, random } from './utils';
import { source, snake, apples } from './index';
import { options } from './options';

function drawFillRect(x, y, width, height, color, context) {
  context.save();
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
  context.restore();
}

export class Tile {
  constructor(x, y, width, height, color, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.context = context;
  }

  draw() {
    drawFillRect(this.x, this.y, this.width, this.height, this.color, this.context);
  }
}

class BodyPart {
  constructor(x, y, width, height, color, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.context = context;
  }

  draw() {
    drawFillRect(this.x, this.y, this.width, this.height, this.color, this.context);
  }
}

export class Snake {
  constructor(x, y, width, height, headColor, bodyColor, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.headColor = headColor;
    this.bodyColor = bodyColor;
    this.context = context;
    this.body = [
      new BodyPart(
        this.x,
        this.y,
        source.options.tileWidth,
        source.options.tileHeight,
        this.headColor,
        this.context
      ),
      new BodyPart(
        this.x - source.options.tileWidth,
        this.y,
        source.options.tileWidth,
        source.options.tileHeight,
        this.bodyColor,
        this.context
      )
    ];
    this.direction = 'ArrowRight';
  }

  draw() {
    for(let i = 0; i < this.body.length; i += 1) {
      this.body[i].draw();
    }
  }

  changeDirection(direction) {
    this.direction = direction;
  }

  move() {
    let prev = { x: this.body[0].x, y: this.body[0].y };
    //moving head:
    // this.body[0].y += 20;
    switch(this.direction) {
      case 'ArrowLeft': this.body[0].x -= source.options.tileWidth; break;
      case 'ArrowUp': this.body[0].y -= source.options.tileHeight; break;
      case 'ArrowRight': this.body[0].x += source.options.tileWidth; break;
      case 'ArrowDown': this.body[0].y += source.options.tileHeight; break;
    }
    //moving body:
    let next;
    for(let i = 1; i < this.body.length; i += 1) {
      next = { x: this.body[i].x, y: this.body[i].y};
      this.body[i].x = prev.x;
      this.body[i].y = prev.y;
      prev = Object.assign({}, next);
    }
  }

  teleport() {
    const width = source.options.renderElement.width;
    const height = source.options.renderElement.height;
    if(this.body[0].x >= width) {
      this.body[0].x = 0;
    }
    if(this.body[0].x < 0) {
      this.body[0].x = width - source.options.tileWidth;
    }
    if(this.body[0].y >= height) {
      this.body[0].y = 0;
    }
    if(this.body[0].y < 0) {
      this.body[0].y = height - source.options.tileHeight;
    }
  }

  checkBites() {
    const head = this.body[0];
    for(let i = 1; i < this.body.length; i += 1) {
      if(head.x === this.body[i].x && head.y === this.body[i].y) {
        log('bite');
        source.toggleStop();
        displayScore.textContent = `Your score: ${score}`;
        about.innerHTML = (`
          <p>${source.options.gameName}</p>
          <p>${source.options.author}</p>
          <p>${source.options.year}</p>
        `);
        gameOver.style.display = 'block';
      }
    }
  }

  eat() {
    for(let i = 0; i < apples.length; i += 1) {
      if(apples[i].x === this.body[0].x && apples[i].y === this.body[0].y) {
        score += 1;
        scoreElement.textContent = `Score: ${score}`;
        source.options.rerenderTime -= 10;
        log('yum');
        this.grow();
        apples.splice(i, 1);
        addApple();
      }
    }
  }

  addBodyPart(where) {
    const last = {
      x: this.body[this.body.length - 1].x,
      y: this.body[this.body.length - 1].y
    }
    switch(where) {
      case 'right': last.x += source.options.tileWidth; break;
      case 'down': last.y += source.options.tileHeight; break;
      case 'left': last.x -= source.options.tileWidth; break;
      case 'up': last.y -= source.options.tileHeight; break;
    }
    this.body.push(
      new BodyPart(
        last.x,
        last.y,
        source.options.tileWidth,
        source.options.tileHeight,
        this.bodyColor,
        this.context
      )
    );
  }

  grow() {
    if(this.direction === 'ArrowLeft') {
      this.addBodyPart('right');
    } else if(this.direction === 'ArrowUp') {
      this.addBodyPart('down');
    } else if(this.direction === 'ArrowRight') {
      this.addBodyPart('left');
    } else if(this.direction === 'ArrowDown') {
      this.addBodyPart('up');
    }
  }
}

class Apple {
  constructor(x, y, width, height, color, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.context = context;
  }

  draw() {
    drawFillRect(this.x, this.y, this.width, this.height, this.color, this.context);
  }
}

export function addApple() {
  const randomX = random(0, options.gridWidth - 1) * source.options.tileWidth;
  const randomY = random(0, options.gridHeight - 1) * source.options.tileHeight;
  let isPlace = true;
  for(let i = 0; i < snake.body.length; i += 1) {
    if(snake.body[i].x === randomX && snake.body[i].y === randomY) {
      isPlace = false;
      break;
    }
  }
  if(!isPlace) {
    addApple();
  }
  if(isPlace) {
    apples.push(
      new Apple(
        randomX,
        randomY,
        source.options.tileWidth,
        source.options.tileHeight,
        source.options.appleColor,
        source.options.context
      )
    );
  }
}