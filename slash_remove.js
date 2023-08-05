const { REST, Routes } = require("discord.js");
const { TOKEN, CLIENT_ID } = require("./config.json")

const rest = new REST({ version: "10" }).setToken(TOKEN);

rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
	.then(() => console.log('削除しました。'))
	.catch(console.error);