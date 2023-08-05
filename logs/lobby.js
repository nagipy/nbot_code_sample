const { EmbedBuilder } = require("discord.js")
const { LOGS_CHANNEL } = require("../config.json")

module.exports = client => {
    client.on("guildMemberAdd", member => {

        const channel = client.channels.cache.get(LOGS_CHANNEL)
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: "参加を検出しました。", iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**${member.displayName}** has Joined\nID: ${member.id}\nUser CreatedAt: ${member.user.createdAt}`)
            .setTimestamp()

        channel.send({ embeds: [embed] })
    })

    client.on("guildMemberRemove", member => {

        const channel = client.channels.cache.get(LOGS_CHANNEL)
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: "退出を検出しました。", iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

        channel.send({ embeds: [embed] })
    })
}