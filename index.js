const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");
const { TOKEN } = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`${filePath} に必要なプロパティがありません。`)
    }

    const cFile = commandsFiles.join(" ☑\n ")
    console.log(`\n────────────\n commands File Loding\n ${cFile}☑\n────────────`)
};

const logsPath = path.join(__dirname, "logs");
const logsFiles = fs.readdirSync(logsPath).filter(file => file.endsWith(".js"));

for (const file of logsFiles) {
    const log = require(`./logs/${file}`);

    client.on("ready", () => { log(client); const lFile = logsFiles.join(" ☑\n "); console.log(`\n────────────\n log File Loding\n ${lFile}☑\n────────────`);});
}

client.on("interactionCreate", async (i) => {
    if (!i.isChatInputCommand()) return;

    const command = i.client.commands.get(i.commandName);

    if (!command) {
        console.error(`${i.commandName} は存在しません。`)
        return;
    }

    try {
        await command.execute(i);
    } catch (error) {
        await i.reply({ content: "エラーが発生しました。", ephemeral: true });
        console.error(error)
    }
})

client.on("ready", (c) => {
    c.user.setPresence({
        status: "idle",
        activities: [{
            name: "Discord.js v14",
            type: ActivityType.Playing
        }]
    })

    console.log(`tag: ${c.user.tag} login`)
})

client.login(TOKEN)