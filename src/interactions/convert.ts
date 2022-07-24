import { SlashCommandIntegerOption } from "@discordjs/builders";
import {SlashCommandBuilder} from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { numberWithCommas } from "../utils/utils";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('convert')
		.setDescription('Converts number of dollars given to Lira at current black market rate')
		.addIntegerOption((option: SlashCommandIntegerOption) =>
			option.setName("value")
				.setDescription("Value in dollars that you want to convert")
				.setRequired(true)
			),
	async execute(interaction: CommandInteraction) {	

		try {

			const inputValue = interaction.options.getInteger("value");
			await interaction.reply(`**${inputValue}** $ equals **${numberWithCommas(Number(inputValue) * Number(marketRate[1].slice(1,).replace(/\D/g, "")))}** LL.\nRate used: **${numberWithCommas(Number(marketRate[1].slice(1,).replace(/\D/g, "")))}** LL.`);

		} catch(error) {
			
			// it isn't possible to check rateData if it is not defined
			// cannot check if it is undefined so this will work as an alternative
			await interaction.reply("This command is currently unavailable.");
		}
    },
};