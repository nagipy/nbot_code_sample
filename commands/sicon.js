const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server-icon")
        .setDescription("reply: server icon"),
    
    async execute (i) {
        const guild = i.guild;
        const icon = guild.iconURL({ dynamic: true, size: 1024 })
        const names = guild.name;

        const embed = new EmbedBuilder()
            .setColor("Grey")
            .setAuthor({ name: `${names}` })
            .setImage(icon)
            .setFooter({ text: `execution user ${i.user.username}` })

        await i.reply({ embeds: [embed] })

        console.log(`\nserver-icon command execute!\nexecution user: ${i.user.username}`)
    }
}