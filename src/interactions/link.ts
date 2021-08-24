import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('Returns link to invite the bot'),
	async execute(interaction: CommandInteraction) {
		// https://discord.com/oauth2/authorize?client_id=826815896718540850&scope=bot&permissions=36826705
        await interaction.reply(`The link is currently outdated, check later`);
	},
};