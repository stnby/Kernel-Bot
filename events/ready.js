// Ready Event

module.exports = client => {
	console.log(`[booted] Bot is Ready!!!`);
	client.user.setGame("with server!");
};
