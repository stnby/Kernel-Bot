// guildMemberRemove Event

const Discord = require("discord.js");
const settings = require("../settings.json");

module.exports = member => {
	const logChannel = member.guild.channels.find("name", settings.logchannelname);
	const embed = new Discord.RichEmbed()
		.setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL)
		.setDescription(`:broken_heart: User Left Server :(\n\n\`\`./userdel ${member.user.username}\`\``)
    .setColor(0xE75A70)
		.setThumbnail(member.user.displayAvatarURL);
	logChannel.send(embed);
	console.log(`[event] User ( ${member.user.tag} ) Left Server`);
};
