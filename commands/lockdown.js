// lockdown Command

const ms = require("ms");

exports.run = (client, message, args) => {

  if (!client.lockit) client.lockit = [];

  const time = args.join(" ");
  const validUnlocks = ["release", "unlock"];

  if (!time) return message.reply("You must set a duration for the Lockdown in either hours, minutes or seconds.");

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.send(":unlock: Lockdown lifted.");
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send(`:lock: Channel locked down for ${ms(ms(time), { long:true })}`).then(() => {	
        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.send(":unlock: Lockdown lifted.")).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));	
      }).catch(error => {
        console.log(error);
      });
    });
  }
};
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["ld", "lockchannel"],
	permLevel: 4
};

exports.help = {
	name: "lockdown",
	description: "This will lock a channel down for the set duration.",
	usage: "lockdown [duration/unlock]"
};
