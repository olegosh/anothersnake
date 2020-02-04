import './index.css';
import { random, Logger } from './utils';
import { options } from './options';

const log = new Logger().log.bind({
  debug: options.debug
});
console.log('from index');
const r = random(0, 1);
log(r);