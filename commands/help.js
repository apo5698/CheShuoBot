const fs = require("fs");
const helpText = "commands/text.json";

module.exports = {
  name: "help",
  description: "Get help",
  execute(message, args) {
    return JSON.parse(fs.readFileSync(helpText, "utf-8"))["help"];
  },
};
