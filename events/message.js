// Message Event

const settings = require("../settings.json");

module.exports = message => {
  const client = message.client
  if (message.author.bot) return;
  if (!message.content.startsWith(settings.prefix)) return;
  if (message.channel.type === "text") {
    if (!message.channel.name.startsWith("bot")) {
      setTimeout(() => message.delete(), 3000);
    }
  }
    
  const command = message.content.split(" ")[0].slice(settings.prefix.length).toLowerCase();
  const args = message.content.split(" ").slice(1);
  const perms = client.elevation(message);
    
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  }
  else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    // console.log(`[log] ${message.channel.type}, ${cmd.conf.enabled}, ${cmd.conf.guildOnly}, ${cmd.conf.permLevel}, ${perms}`);
    if (cmd.conf.enabled == false) return message.reply("**Command was disabled by Author!**");
    if (cmd.conf.guildOnly == true && message.channel.type !== "text") return message.reply("**This command is not allowed here!**");
    if (perms < cmd.conf.permLevel) return message.reply(`You don't have enough permissions! **${perms}**`);
    cmd.run(client, message, args, perms);
  }
};
