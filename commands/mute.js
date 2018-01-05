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
	enabled: false,
	guildOnly: true,
	aliases: [],
	permLevel: 2
};

exports.help = {
	name: "mute",
	description: "Mutes member.",
	usage: "mute [user] [reason]"
};
