import './index.css';
import { log, setScreenSize, handleKeydown, handleKeyup } from './utils';
import { Source } from './source';
import { options } from './options';
import { Snake, addApple } from './objects';

export let source, snake, apples, score;

let snakeCx, snakeCy;

export const scoreElement = document.getElementById('score'),
      displayScore = document.getElementById('display-score'),
      gameOver = document.getElementById('game-over'),
      about = document.getElementById('about');

function init() {
  score = 0;
  source = new Source(options);
  source.setCanvas();
  source.createControls();
  source.createGrid();

  snakeCy = Math.ceil(source.grid.length / 2) * source.options.tileHeight;
  snakeCx = Math.ceil(source.grid[0].length / 2) * source.options.tileWidth;
  // x, y, width, height, headColor, bodyColor, context
  snake = new Snake(
    snakeCx,
    snakeCy,
    source.options.tileWidth,
    source.options.tileWidth,
    source.options.headColor,
    source.options.bodyColor,
    source.options.context
  );

  apples = [];
  addApple();

  window.addEventListener('keydown', () => handleKeydown(event, source), false);
  window.addEventListener('keyup', () => handleKeyup(event, source), false);
}

window.addEventListener('load', () => {
  log('loading...');
  init();
  // createControls();
  const playButton = document.getElementById('play-button');
  const menu = document.getElementById('menu');
  const form = document.getElementById('select-size');

  for(let i = 0; i < form.elements.length; i += 1) {
    let element = form.elements[i];
    if(element.tagName !== 'INPUT') {
      continue;
    }
    element.addEventListener('change', setScreenSize, false);
  }
  playButton.addEventListener('click', () => {
    menu.style.display = 'none';
    init();
    // createControls();
    source.start();
  }, false);
  log('loaded');
}, false);

