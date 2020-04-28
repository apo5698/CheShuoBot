const util = require('../util.js');
const rollText = require('./roll.json');

/**
 * Return a random integer within given range.
 * @param {number} from minimum bound
 * @param {number} to maximum bound
 */
function randomInt(from, to) {
  from = Math.ceil(from);
  to = Math.floor(to);
  const int = Math.floor(Math.random() * (to - from + 1)) + from;
  util.cmd('RAND', 'int', `{${from}:${to}} => ${int}`);
  return int;
}

/**
 * Return a random item in given array.
 * @param {Object[]} array array with elements
 */
function randomItem(array) {
  const index = randomInt(0, array.length - 1);
  const value = array[index];
  util.cmd('RAND', 'item', value);
  return value;
}

module.exports = {
  name: 'roll',
  description: 'Roll from numbers or values',
  execute(args) {
    let item;
    let range = args;
    // ?roll: default number range {1:100}
    if (args.length == 0) {
      range = `${rollText.default_min}-${rollText.default_max}`;
      item = randomInt(rollText.default_min, rollText.default_max);
    } else if (args.length == 1) {
      // ?roll <num1-num2>: number range {num1:num2}
      if (args[0].match(/\d+-\d+/g)) {
        const dash = args[0].split('-');
        let from = parseInt(dash[0]);
        let to = parseInt(dash[1]);
        if (from > to) {
          const temp = from;
          from = to;
          to = temp;
        }
        range = `${from}-${to}`;
        item = randomInt(from, to);
      }
      // ?roll <num>: number range {1:num}
      else if (args[0].match(/\d+/g)) {
        range = `${rollText.default_min}-${args[0]}`;
        item = randomInt(rollText.default_min, args[0]);
      }
      // ?roll <item>: item in roll.json
      else {
        let valid = false;
        for (const t in rollText) {
          if (args[0] === t) {
            valid = true;
            range = rollText[args[0]];
            item = randomItem(range);
          }
        }
        // Invalid argument
        if (!valid) {
          console.log('INVALID'.yellow);
          return NaN;
        }
      }
    }
    // ?roll <item1> <item2> ...: multiple items
    else if (args.length > 1) {
      item = randomItem(args);
    }

    return [range, item];
  },
};
