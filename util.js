const moment = require("moment");

module.exports = {
  getCurrentTime: function (format = "YYYY-MM-DD HH:mm:ss") {
    return moment().format(format);
  },
};
