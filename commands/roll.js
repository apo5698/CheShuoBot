/**
 * Return a random integer within given range.
 * @param {number} min minimum bound
 * @param {number} max maximum bound
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const int = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`NUM   {${min}:${max}} => ${int}`.yellow);
  return int;
}

/**
 * Return a random item in given array.
 * @param {any[]} array array with elements
 */
function getRandomItem(array) {
  const index = getRandomInt(0, array.length - 1);
  const value = array[index];
  console.log(`    ITEM  {${array}}[${index}]: ${value}`.yellow);
  return value;
}

module.exports = {
  name: "roll",
  description: "Roll from numbers or values",
  execute(message, args) {
    process.stdout.write("RAND".black.bgYellow);
    var item, min, max;
    if (args.length > 1) {
      min = 0;
      max = args.length;
      range = args;
      item = getRandomItem(args);
    } else {
      if (args.length == 0) {
        min = 1;
        max = 100;
      }
      if (args.length == 1) {
        if (args[0].match(/\d+-\d+/)) {
          const range = args[0].split("-");
          min = parseInt(range[0]);
          max = parseInt(range[1]);
          if (min > max) {
            var temp = min;
            min = max;
            max = temp;
          }
        } else if (parseInt(args[0])) {
          min = 1;
          max = args[0];
        } else {
          console.log("INVALID".yellow);
          return NaN;
        }
      }
      range = `${min}-${max}`;
      item = getRandomInt(min, max);
    }
    return [range, item];
  },
};
