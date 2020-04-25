const fs = require("fs");
const helpText = "commands/text.json";

module.exports = {
  name: "about",
  description: "Get information of this bot",
  execute(message, args) {
    return JSON.parse(fs.readFileSync(helpText, "utf-8"))["about"];
  },
};
