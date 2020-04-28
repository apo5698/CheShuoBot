const moment = require('moment');

function _getCurrentTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

function _cheshuo() {
  process.stdout.write(`[${_getCurrentTime()}] `);
}

module.exports = {
  /**
   * Return current date and time.
   * @param {string} format date format
   */
  getCurrentTime: function () {
    return _getCurrentTime();
  },
  /**
   * Print to `stdout` with newline.
   * @param {string} message message
   */
  log: function (message) {
    _cheshuo();
    console.log(message);
  },
  /**
   * Print command to console.
   * @param {string} cmd command (caplitalized)
   * @param {string} type type
   * @param {string} message message
   */
  cmd: function (command, type, message) {
    _cheshuo();
    console.log(`${command.black.bgGreen} ${type.magenta.bold} ${message}`);
  },
  /**
   * Print error message to console.
   * @param {string} message message
   */
  err: function (message) {
    _cheshuo();
    console.log(`${'ERR!'.red.bgBlack} ${message}`);
  },
};
