import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription('Returns link to bot\'s github'),
	async execute(interaction: CommandInteraction) {
        await interaction.reply(`https://github.com/Howardlight/Riad-Salemeh-TS`);
	},
};