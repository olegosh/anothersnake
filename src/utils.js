import { options } from './options';

export function random(min, max) {
  return Math.floor(
    Math.random() * (1 + max - min) + min
  );
}

export function setScreenSize() {
  for(let i = 0; i < form.elements.length; i += 1) {
    let element = form.elements[i];
    if(element.tagName !== 'INPUT') {
      continue;
    }
    if(element.checked) {
      source.options.gridWidth = source.options.gridHeight = parseInt(element.value);
    }
  }
}

class Logger {
  log(...args) {
    if(this && this.debug) {
      console.log(...args);
    }
  }
}
export const log = new Logger()
  .log
  .bind({
    debug: options.debug
});

export function wait(milliseconds) {
  return new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      resolve();
      clearTimeout(timeout);
    }, milliseconds);
  });
}

export function handleKeydown(event, source) {
  setKeys(event, source);
}

export function handleKeyup(event, source) {
  setKeys(event, source);
}

export function handleClick(event) {
  //log(event.target);
  setKeys(event, source);
}

function setKeys(event, source) {
  if(event) {
    event.preventDefault();
    //log(event.type);
    const keys = source.options.keys;
    const key = event.key ? event.key : null;
    const type = event.type;
    
    if(type === 'click') {
      setKey(type);
    }

    switch(key) {
      case 'ArrowLeft': {
        if(snake.direction === 'ArrowRight') {
          break;
        }
        setKey(type, keys, key); break;
      }
      case 'ArrowUp': {
        if(snake.direction === 'ArrowDown') {
          break;
        }
        setKey(type, keys, key); break;
      }
      case 'ArrowRight': {
        if(snake.direction === 'ArrowLeft') {
          break;
        }
        setKey(type, keys, key); break;
      }
      case 'ArrowDown': {
        if(snake.direction === 'ArrowUp') {
          break;
        }
        setKey(type, keys, key); break;
      }
    }
  }
}

function checkPrevious(direction) {
  if((snake.direction === 'ArrowRight' && direction === 'ArrowLeft') ||
     (snake.direction === 'ArrowDown' && direction === 'ArrowUp') ||
     (snake.direction === 'ArrowLeft' && direction === 'ArrowRight') ||
     (snake.direction === 'ArrowUp' && direction === 'ArrowDown')) {
    return true;
  }
  return false;
}

function setKey(type, keys, key) {
  if(type === 'keydown') {
    keys[key] = true;
    snake.changeDirection(key);
    // wait(options.rerenderTime / 4).then(() => snake.changeDirection(key));
    log(key + ' = true');
  } else if(type === 'keyup') {
    keys[key] = false;
    log(key + ' = false');
  } else if(type === 'click') {
    const id = event.target.id;
    //log(event.target);
    if(id === 'controls' || id === 'center') {
      return;
    }
    const capitalizedId = id[0].toUpperCase() + id.slice(1);
    const direction = 'Arrow' + capitalizedId;
    if(checkPrevious(direction)) {
      return;
    }
    snake.changeDirection(direction);
  }
}