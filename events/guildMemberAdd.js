// guildMemberAdd Event

const Discord = require("discord.js");
const settings = require("../settings.json");

module.exports = member => {
	member.addRole(member.guild.roles.find("name", settings.defaultrolename));
	const logChannel = member.guild.channels.find("name", settings.logchannelname);
	const embed = new Discord.RichEmbed()
		.setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL)
		//.setDescription(":green_heart: User Joined Server :)")
		.setDescription(`:green_heart: User Joined Server :)\n\n\`\`./useradd -m -G ${member.guild.name} -s /bin/bash ${member.user.username}\`\``)
		.setColor(0x78B159)
		//.setFooter(`./useradd -m -G ${member.guild.name} -s /bin/bash ${member.user.username}`)
		.setThumbnail(member.user.displayAvatarURL);
	logChannel.send(embed);
	console.log(`[event] User ( ${member.user.tag} ) Joined Server`);
};
