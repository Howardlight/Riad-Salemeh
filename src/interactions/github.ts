import { SlashCommandBuilder } from "@discordjs/builders";
const { CommandInteraction } = require("@discordjs/builders");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription('Returns link to bot\'s github'),
	async execute(interaction: typeof CommandInteraction) {
        await interaction.reply(`https://github.com/Howardlight/Riad-Salemeh-TS`);
	},
};