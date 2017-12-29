// 8ball Command

exports.run = (client, message, args) => {
	let question = args.join(" ");
	if (!question) return message.reply("\nYou must provide a question!");
	const fortunes = [
		"It is certain",
		"It is decidedly so",
		"Without a doubt",
		"Yes definitely",
		"You may rely on it",
		"As I see it, yes",
		"Most likely",
		"Outlook good",
		"Yes",
		"Signs point to yes",
		"Reply hazy try again",
		"Ask again later",
		"Better not tell you now",
		"Cannot predict now",
		"Concentrate and ask again",
		"Don't count on it",
		"My reply is no",
		"My sources say no",
		"Outlook not so good",
		"Very doubtful"
	];
	let answer = fortunes[Math.floor(Math.random() * fortunes.length)];
	message.channel.send(`:8ball: **${question}**\n  **-** *${answer}*`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["eightball"],
	permLevel: 0
};

exports.help = {
	name: "8ball",
	description: "Just another regular 8ball.",
	usage: "8ball [question]"
};
