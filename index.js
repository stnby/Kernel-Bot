const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");
const token = require("./token.json");

const fs = require("fs");
require("./util/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Load
fs.readdir('./commands/', (err, files) => {
	if (err) console.error(err);
	let jsFiles = files.filter(f => f.split(".").pop() === "js");
	if (jsFiles.length <= 0) return console.log("[warning] No Commands to load!");
	console.log(`[info] Loading ${jsFiles.length} commands...`);
	jsFiles.forEach(f => {
		let props = require(`./commands/${f}`);
		console.log(`[load] Command: ${props.help.name}`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});

// Reload
client.reload = command => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./commands/${command}`)];
			const cmd = require(`./commands/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
			});
			client.commands.set(command, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
	    	reject(e);
		}
	});
};

client.elevation = message => {
	/* This function should resolve to an ELEVATION level which
	   is then sent to the command handler for verification
	   0 - None
	   2 - Mod
	   3 - Admin
	   4 - Owner */
	let permlvl = 0;
	const mod_role = message.guild.roles.find('name', settings.modrolename);
	if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
	const admin_role = message.guild.roles.find('name', settings.adminrolename);
	if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
	if (message.author.id === settings.ownerid) permlvl = 4;
	return permlvl;
};

// Start Bot
client.login(token.token);