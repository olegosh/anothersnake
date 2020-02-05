import { draw } from './draw';

const renderElement = document.getElementById('snake');
const tileWidth = 20;
const tileHeight = 20;

export const options = {
  renderElement,
  context: renderElement.getContext('2d'),
  rerenderTime: 500,
  testCounter: 0,
  testStopCounter: 100,
  debug: true,
  isStopped: false,
  draw,
  keys: {
    ArrowLeft: false,
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false
  },
  gridWidth: 20,
  gridHeight: 20,
  controlsScreenPart: 3,
  tileWidth,
  tileHeight,
  tileColor: '#656565',
  headColor: '#D32715',
  bodyColor: '#F38D09',
  appleColor: '#5AB015',
  gameName: 'AnotherSnake? Game',
  author: 'Olegosh',
  year: 2020
}