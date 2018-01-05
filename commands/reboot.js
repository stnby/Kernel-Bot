// reboot Command

exports.run = (client, message) => {
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reload"],
  permLevel: 4
};

exports.help = {
  name: "reboot",
  description: "Updates Bot to latest version",
  usage: "reboot"
};
