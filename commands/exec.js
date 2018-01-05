// Update Command

const Discord = require("discord.js");
const execSync = require("child_process").execSync;

exports.run = (client, message, args) => {
  const commandIn = args.join(" ");
  const commandOut = execSync("bash " + commandIn)

  const embed = new Discord.RichEmbed()
    .setAuthor("Terminal", "https://i.imgur.com/dnfJGpL.png")
    .setDescription(":inbox_tray: **Input**\n```bash " + commandIn + "```\n:outbox_tray: **Output**```" + commandOut + "```")
    .setColor(0xffaa80)
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bash", "sh", "shell"],
  permLevel: 4
};

exports.help = {
  name: "exec",
  description: "Executes Command on Server",
  usage: "exec"
};
