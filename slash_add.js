const { REST, Routes } = require("discord.js");
const { TOKEN, CLIENT_ID } = require("./config.json");
const fs = require("node:fs");

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log("登録中")

        const data = await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );
    } catch (error) {
        console.error(error);
    }
})();