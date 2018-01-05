const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require("./settings.json");

// Pinger
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  require("http").get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

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
  /*
  0 - None
  2 - Mod
  3 - Admin
  4 - Owner */
  let permLvl = 0;
  if (message.channel.type === "text") {
    const modRole = message.guild.roles.find('name', settings.modRoleName);
    if (modRole && message.member.roles.has(modRole.id)) permLvl = 2;
    const adminRole = message.guild.roles.find('name', settings.adminRoleName);
    if (adminRole && message.member.roles.has(adminRole.id)) permLvl = 3;
  }
  if (message.author.id === settings.ownerId) permLvl = 4;
  return permLvl;
};

// Start Bot
client.login(process.env.DISCORD_TOKEN);
