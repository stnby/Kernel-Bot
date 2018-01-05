// sysinfo Command

const Discord = require("discord.js");
const execSync = require("child_process").execSync;

let nodeVersion = execSync("node -v");
let memoryUsage = execSync("free -h | grep 'Mem' | awk '{print $3 \"/\" $2}'");

exports.run = (client, message) => {
	message.channel.send(`${nodeVersion}`);
  
  const embed = new Discord.RichEmbed()
		.setAuthor("SysInfo", "https://i.imgur.com/dnfJGpL.png")
		.setColor(0x99ffdd)
    .addField("Developer:", "Stnby#5408", 1)
    .addField("UpTime:", "none", 1)
    .addField("CPU Usage:", "none")
    .addField("Memory Usage:", memoryUsage, 1)
    .addField("Node.js Ver:", nodeVersion)
		//.setFooter(`./useradd -m -G ${member.guild.name} -s /bin/bash ${member.user.username}`)
		//.setThumbnail(member.user.displayAvatarURL);
	message.channel.send(embed);
};

exports.conf = {
	enabled: false,
	guildOnly: false,
	aliases: ["sysi"],
	permLevel: 4
};

exports.help = {
	name: "sysinfo",
	description: "Updates Bot to latest version",
	usage: "sysinfo"
};
