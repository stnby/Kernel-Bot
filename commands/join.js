

exports.run = (client, message) => {
	const sndChannel = message.member.voiceChannel;
  if (!sndChannel) return message.reply("You have to be in Voice Channel to play music!");
  sndChannel.join().then(connection => {
    console.log("[log] Connected To Voice Channel");
    message.channel.send(":speaking_head: ``Joined Voice Channel!``");
    require('http').get("http://stream.m-1.fm/m1/aacp64", mus => {
		  connection.playStream(mus);
			})
    })
};

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: ["play", "music"],
	permLevel: 0
};

exports.help = {
	name: "snd",
	description: "Music Helper",
	usage: "snd [join/leave/play/stop/np/queue]"
};
