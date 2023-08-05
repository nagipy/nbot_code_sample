const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const yts = require("yt-search");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("youtube-search")
        .setDescription("reply: Youtube Video")
        .addStringOption(option => option.setName("word").setDescription("調べたい動画の単語を入力してください").setRequired(true)),

    async execute(i) {
        const content = i.options.getString("word");
        const r = await yts(content)
        const videos = r.videos.slice(0, 1)

        videos.forEach(function (v) {

            const embed = new EmbedBuilder()
                .setColor("Gold")
                .setTitle(v.title)
                .setURL(`${v.url}`)
                .setAuthor({ name: v.author.name, url: v.author.url })
                .addFields({ name: "Video views", value: `${v.views.toLocaleString()}`, inline: true })
                .addFields({ name: `Video id`, value: `${v.videoId}`, inline: true })
                .addFields({ name: "Serach words", value: `${content}`, inline: true })
                .addFields({ name: "Video url", value: `${v.url}`, inline: false })
                .setImage(v.image)
                .setFooter({ text: `execution user ${i.user.username}`, iconURL: i.user.displayAvatarURL() })
                .setTimestamp()

            const vButton = new ButtonBuilder()
                .setLabel("Jump to video")
                .setURL(v.url)
                .setStyle(ButtonStyle.Link)

            const cButton = new ButtonBuilder()
                .setLabel("Jump to channel")
                .setURL(v.author.url)
                .setStyle(ButtonStyle.Link)

            const row = new ActionRowBuilder()
                .addComponents(vButton, cButton)

            i.reply({ embeds: [embed], components: [row] })

            console.log(`\nyt-search command execute!\nexecution user: ${i.user.username}\n \nVideo Auhor ${v.author.name}｜Video Title ${v.title}｜Video Id ${v.videoId}\n${v.url}`)
        })
    }
}