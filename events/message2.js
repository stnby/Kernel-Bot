// Message2 Event

const settings = require("../settings.json");

module.exports = message => {
  const client = message.client;
  if (message.channel.type === "dm") return;
  else if (message.author.bot) return;
  else if (message.author.id === settings.ownerId) return;

  let msg = message.content.toLowerCase();

  if (settings.adUrl.some(word => msg.includes(word))) {
    console.log("[event] Found AD");
    message.delete();
      message.reply("Please do not advertise on this server!");
  }
  else if (settings.ipLoggerUrl.some(word => msg.includes(word))) {
    console.log("[event] Found IP Logger");
    message.delete();
      message.reply("Trust me you don't want to post that link again.");
  }
  else if (settings.blacklistedUrl.some(word => msg.includes(word))) {
    console.log("[event] Found Blacklisted URL");
    message.delete();
      message.reply("Blacklisted URL Nice try");
  }
  else if (settings.bannedWords.some(word => msg.includes(word))) {
    console.log("[event] Found Banned word");
    message.delete();
      message.reply("Banned Word!");
  }
};
