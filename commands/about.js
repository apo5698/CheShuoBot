const text = require('./text.json');

module.exports = {
  name: 'about',
  description: 'Get information of this bot',
  execute() {
    return text.about;
  },
};
