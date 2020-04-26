const text = require('./text.json');

module.exports = {
  name: 'help',
  description: 'Get help',
  execute() {
    return text.help;
  },
};
