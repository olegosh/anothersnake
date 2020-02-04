import { options } from './options';

export function random(min, max) {
  return Math.floor(
    Math.random() * (1 + max - min) + min
  );
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
