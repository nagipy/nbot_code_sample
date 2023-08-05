const { EmbedBuilder } = require("discord.js");
const { LOGS_CHANNEL } = require("../config.json");

module.exports = client => {
    client.on("voiceStateUpdate", async (oldState, newState) => {
        if (oldState && newState) {
            const channel = client.channels.cache.get(LOGS_CHANNEL)

            if (oldState.channelId === null && newState.channelId !== null) {
                const guild = newState.guild
                const user = await client.users.fetch(newState.id)
                const member = guild.members.cache.get(newState.id)

                const embed = new EmbedBuilder()
                    .setColor("Green")
                    .setAuthor({ name: "接続を検知しました。", iconURL: user.displayAvatarURL({ dynamic: true }) })
                    .addFields(
                        {
                            name: "User",
                            value: user.username,
                            inline: true
                        },
                        {
                            name: "Nickname",
                            value: member.nickname || "未設定",
                            inline: true
                        },
                        {
                            name: "Channel",
                            value: newState.channel.name
                        }
                    )
                    .setTimestamp()

                channel.send({ embeds: [embed] })
            }

            if (oldState.channelId !== null && newState.channelId === null) {
                const guild = oldState.guild;
                const user = await client.users.fetch(oldState.id)
                const member = guild.members.cache.get(oldState.id)

                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({ name: "切断を検知しました。", iconURL: user.displayAvatarURL({ dynamic: true }) })
                    .addFields(
                        {
                            name: "User",
                            value: user.username,
                            inline: true
                        },
                        {
                            name: "Nickname",
                            value: member.nickname || "未設定",
                            inline: true
                        },
                        {
                            name: "Channel",
                            value: oldState.channel.name
                        }
                    )
                    .setTimestamp()

                channel.send({ embeds: [embed] })
            }
        }
    })
}
