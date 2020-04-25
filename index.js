const colors = require("colors");
const Discord = require("discord.js");
const fs = require("fs");
const util = require("./util.js");

const config = require("./config.json");
const text = require("./commands/text.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((f) => f.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
const defaultThemeColor = Discord.Util.resolveColor("ORANGE");

/**
 * Return a embed message.
 * @param {string} title title
 * @param {string} url url
 * @param {string} author author
 * @param {string} description description
 * @param {string} thumbnail thumbnail
 * @param {string} field field
 * @param {Object} fields fields
 * @param {string} image image
 * @param {string} timestamp timestamp
 * @param {string} footer footer
 */
function embedMessage(
  title = "",
  url = "",
  author = "",
  description = "",
  thumbnail = "",
  field = "",
  fields = {},
  image = "",
  timestamp = "",
  footer = ""
) {
  // TODO
  return new Discord.MessageEmbed();
}

// Login
client.once("ready", () => {
  console.log(`Starting time: ${util.getCurrentTime()}`);
});
client.login(config.token);

// Listen
client.on("message", (msg) => {
  if (!config.prefix.includes(msg.content.charAt(0)) && !msg.author.bot) return;

  let msgLog =
    `[${util.getCurrentTime()}]` +
    `(${msg.guild.name})<@${msg.member.user.tag}>: `;
  // User tag in message (mention)
  if (msg.content.match(/<@[!]?\d+>/)) {
    const user = msg.mentions.users.first();
    msgLog += `<@${user.username}#${user.discriminator}>`;
  } else {
    msgLog += msg.content;
  }
  console.log(msg.author.bot ? msgLog.blue : msgLog);
  if (msg.author.bot) return;

  const args = msg.content
    .replace(/\s+/g, " ")
    .trim()
    .slice(1)
    .trim()
    .split(" ");
  const cmd = args.shift().toLowerCase();
  const channel = msg.channel;

  let reply = "command not supported:(";
  switch (cmd) {
    case "a":
    case "about":
      reply = client.commands.get("about").execute(msg, text);
      break;
    case "h":
    case "help":
      reply = client.commands.get("help").execute(msg, text);
      break;
    case "r":
    case "roll":
      roll = client.commands.get("roll").execute(msg, args);
      if (Number.isNaN(roll)) return;
      reply = `From [${roll[0]}] selected: **${roll[1]}**`;
      break;
    case "shit":
    case "cesuo":
    case "cheshuo":
      reply = text.cheshuo;
      break;
    default:
      reply = `${cmd}: ${reply}`;
  }
  channel.send(reply);
});

// Logout
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("SIGINT", () => {
  rl.question("Destroy/logout the bot? (y/n): ", (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      client.destroy();
      rl.pause();
    }
  });
});
