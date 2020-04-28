require('colors');
const Discord = require('discord.js');
const fs = require('fs');
const util = require('./util.js');

const config = require('./config.json');
const text = require('./commands/text.json');
const { token } = require('./token.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((f) => f.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
const defaultThemeColor = Discord.Constants.Colors.ORANGE;

/**
 * Return a embed message (default color orange #e67e22).
 */
function embed() {
  return new Discord.MessageEmbed().setColor(defaultThemeColor);
}

// Login
client.once('ready', () => {
  util.log('(init)'.grey);
});
client.login(token);
util.log('Login successful');

// Listen
client.on('message', (msg) => {
  // Ignore non-command messages
  if (!config.prefix.includes(msg.content.charAt(0)) && !msg.author.bot) return;

  const msgServerName = msg.guild.name;
  const msgUserName = msg.member.user.tag;
  let msgContent;
  // User tag in message (mention)
  if (msg.content.match(/<@[!]?\d+>/)) {
    const user = msg.mentions.users.first();
    msgContent = `<@${user.username}#${user.discriminator}>`;
  }
  // Normal message
  else {
    msgContent = msg.content;
  }
  const msgLog = `(${msgServerName})<@${msgUserName}>: ${msgContent}`;

  // Bot messages in color blue
  util.log(msg.author.bot ? msgLog.blue : msgLog);
  // No need to execute if it is a bot message
  if (msg.author.bot) return;
  // ?????
  config.prefix.forEach((e) => {
    if (msg.content.match(new RegExp(`^[${e}]+$`, 'g'))) {
      util.log(`<${msgUserName}> feels confused...`);
      return;
    }
  });

  const args = msg.content
    .replace(/\s+/g, ' ')
    .trim()
    .slice(1)
    .trim()
    .split(' ');
  const cmd = args.shift().toLowerCase();
  const channel = msg.channel;

  let reply;
  switch (cmd) {
    case 'a':
    case 'about':
      reply = client.commands.get('about').execute();
      break;
    case 'h':
    case 'help':
      reply = client.commands.get('help').execute();
      break;
    case 'p':
    case 'play':
      // TODO: implement
      // reply = client.commands.get('play').execute();
      break;
    case 'r':
    case 'roll': {
      const roll = client.commands.get('roll').execute(args);
      if (!roll) return;
      // Result as title
      // Range as description
      reply = embed().setTitle(roll[1]).setDescription(`from\n[${roll[0]}]`);
      break;
    }
    case 'shit':
    case 'cesuo':
    case 'cheshuo':
      reply = text.cheshuo;
      break;
    default:
      util.err('Command undefined');
  }

  if (!reply) return;
  channel.send(reply);
});

// Logout
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on('SIGINT', () => {
  rl.question('Shut down the bot? (y/n): ', (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      client.destroy();
      rl.pause();
    }
  });
});
