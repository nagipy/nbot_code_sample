const { EmbedBuilder } = require("discord.js");
const { LOGS_CHANNEL } = require("../config.json");

module.exports = client => {
    client.on("guildMemberUpdate", async (oldMember, newMember) => {
        const channel = client.channels.cache.get(LOGS_CHANNEL)

        if (oldMember.nickname !== newMember.nickname) {
            const embed = new EmbedBuilder()
                .setColor("Gold")
                .setAuthor({ name: "変更を検出しました。", iconURL: oldMember.user.displayAvatarURL({ dynamic: true }) })
                .addFields(
                    {
                        name: "User",
                        value: oldMember.user.tag
                    },
                    {
                        name: "old",
                        value: oldMember.nickname || oldMember.user.username,
                        inline: true
                    },
                    {
                        name: "new",
                        value: newMember.nickname || newMember.user.username,
                        inline: true
                    }
                )
                .setTimestamp()

            channel.send({ embeds: [embed] })
        }
    })
}

