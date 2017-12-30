// Message2 Event

const settings = require("../settings.json");

module.exports = message => {
	const client = message.client;
	if (message.channel.type === "dm") return;
	if (message.author.bot) return;
	if (message.author.id === settings.ownerid) return;

	let msg = message.content.toLowerCase();

	if (settings.adurl.some(word => msg.includes(word))) {
		console.log("[event] Found AD");
		message.delete();
    	message.reply("Please do not advertise on this server!");
	}
	if (settings.iploggerurl.some(word => msg.includes(word))) {
		console.log("[event] Found IP Logger");
		message.delete();
    	message.reply("Trust me you don't want to post that link again.");
	}
	if (settings.blacklistedurl.some(word => msg.includes(word))) {
		console.log("[event] Found Blacklisted URL");
		message.delete();
    	message.reply("Blacklisted URL Nice try");
	}
	if (settings.bannedwords.some(word => msg.includes(word))) {
		console.log("[event] Found Banned word");
		message.delete();
    	message.reply("Banned Word!");
	}

};
