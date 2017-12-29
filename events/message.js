// Message Event

const settings = require("../settings.json");

module.exports = message => {
	const client = message.client;
	if (message.author.bot) return;
	if (!message.content.startsWith(settings.prefix)) return;
	if (!message.channel.name.startsWith("bot")) {
		setTimeout(() => message.delete(), 3000);
    }

	const command = message.content.split(" ")[0].slice(settings.prefix.length);
	const args = message.content.split(" ").slice(1);
	const perms = client.elevation(message);
	let cmd;
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
		cmd = client.commands.get(client.aliases.get(command));
	}
	if (cmd) {
		if (perms < cmd.conf.permLevel) return;
		cmd.run(client, message, args, perms);
	} 	
};
