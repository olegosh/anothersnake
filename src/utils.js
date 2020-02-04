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
