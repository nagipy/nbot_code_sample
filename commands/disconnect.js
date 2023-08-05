const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("disconnect")
        .setDescription("reply: setUser disconnect")
        .addUserOption(option => option.setName("user").setDescription("切断したいユーザーを選択してください").setRequired(true)),

    async execute (i) {
        const { options } = i;

        const user = options.getUser("user");

        const avatar = user.displayAvatarURL();
        const names = user.username;

        const member = await i.guild.members.fetch(user.id);
        const nick = member.nickname || "none";

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: `強制切断を実行しました。`, iconURL: avatar })
            .addFields({ name: "User", value: `${names}`, inline: true })
            .addFields({ name: "Nickname", value: `${nick}`, inline: true })
            .setTimestamp()

        member.voice.disconnect();

        await i.reply({ embeds: [embed] })

        console.log(`\ndisconnect command execute!\nexecution user: ${i.user.username}\ | select user: ${names}`)
    }
}