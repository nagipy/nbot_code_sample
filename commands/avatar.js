const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user-avatar")
        .setDescription("reply: user avatar")
        .addUserOption(option => option.setName("user").setDescription("select user").setRequired(false)),

    async execute (i) {
        const { options } = i;

        const user = options.getUser("user") || i.user;
        const avatar = user.displayAvatarURL({ dynamic: true, size: 1024});
        const names = user.username;

        const embed = new EmbedBuilder()
            .setColor("Grey")
            .setAuthor({ name: `${names}` })
            .setImage(avatar)
            .setFooter({ text: `execution user ${i.user.username}` })

        await i.reply({ embeds: [embed] })

        console.log(`\navatar command execute!\nexecution user: ${i.user.username}\nselect user: ${names}`)
    }
}