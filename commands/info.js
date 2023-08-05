const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user-info")
        .setDescription("reply: user info")
        .addUserOption(option => option.setName("user").setDescription("select user").setRequired(false)),

    async execute (i) {
        const { options } = i;

        const user = options.getUser("user") || i.user;
        const avatar = user.displayAvatarURL();
        const names = user.username;

        const member = await i.guild.members.fetch(user.id)
        const nick = member.nickname || "none";

        const roles = member.roles.cache.size -1;
        const bot = user.bot;

        const embed = new EmbedBuilder()
            .setColor("Grey")
            .setAuthor({ name: `${names}(${nick})`, iconURL: avatar })
            .addFields({ name: "User name", value: `${names}`, inline: true})
            .addFields({ name: "User Id", value: `${user.id}`, inline: true})
            .addFields({ name: "Nick name", value: `${nick}` })
            .addFields({ name: "Joined Server", value: new Date(member.joinedTimestamp).toLocaleDateString(), inline: true})
            .addFields({ name: "Joined Discord", value: new Date(user.createdTimestamp).toLocaleString(), inline: true})
            .addFields({ name: "Is bot", value: `${bot}`, inline: true})
            .addFields({ name: "Roles", value: `${roles}` })
            .setThumbnail(avatar)
            .setTimestamp()

        await i.reply({ content: `<@${i.user.id}> select user info` ,embeds: [embed] })

        console.log(`\ninfo command execute!\nexecution user: ${i.user.username}\nselect user: ${names}`)
    }
}