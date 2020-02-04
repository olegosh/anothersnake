export function random(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

export class Logger {
  log(...args) {
    if(this && this.debug) {
      console.log(...args);
    }
  }
}

export function wait(milliseconds) {
  return new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      resolve();
      clearTimeout(timeout);
    }, milliseconds);
  });
}