// purge Command

exports.run = (client, message, args) => {
  let messagecount = parseInt(args.join(" "));
  if (!messagecount) messagecount = 1;
  messagecount += 1;
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["purge"],
  permLevel: 2
};

exports.help = {
  name: "clear",
  description: "Removes given amount of messages from current channel.",
  usage: "clear [number]"
};
