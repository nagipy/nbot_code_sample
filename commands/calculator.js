const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("calculation")
        .setDescription("計算機")
        .addNumberOption(option => option.setName("first-number").setDescription("数字").setRequired(true))
        .addNumberOption(option => option.setName("second-number").setDescription("数字").setRequired(true)),

    async execute (i) {
        const first = i.options.getNumber("first-number");
        const second = i.options.getNumber("second-number");

        const result = first + second;

        await i.reply({ content: `${first} + ${second} = ${result}` })

        console.log(`\ncalculation command execute!\nexecution user: ${i.user.username}\n \n${first} + ${second} = ${result}`)
    }
}