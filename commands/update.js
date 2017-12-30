// Update Command

exports.run = (client, message) => {

	process.exit(0);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 4
};

exports.help = {
	name: "update",
	description: "Updates Bot to latest version",
	usage: "update"
};
