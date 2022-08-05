import { CommandInteraction, SlashCommandIntegerOption, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { numberWithCommas } from "../utils/utils";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('convert')
		.setDescription('Converts number of dollars given to Lira at current black market rate')
		.addIntegerOption((option: SlashCommandIntegerOption) => 
			option.setName("tocurrency")
				.setDescription("Set what kind of conversion, from USD to LBP or LBP to USD")
				.setRequired(true)
				.addChoices(
					{ name: "LBP to USD", value: 0 },
					{ name: "USD to LBP", value: 1 }
				)
		)
		.addIntegerOption((option: SlashCommandIntegerOption) =>
			option.setName("value")
				.setDescription("Value in dollars that you want to convert")
				.setRequired(true)
		),
	async execute(interaction: CommandInteraction) {	

		try {

			//TODO: Handle Cases when marketRate is not yet defined
			const conversionType = interaction.options.get("tocurrency", true);
			const inputValue = interaction.options.get("value", true);

			// console.log(conversionType);
			let out: string;
			
			
			if(conversionType.value == 0) out = `**${inputValue.value}** LBP equals **${numberWithCommas(Math.round(Number(inputValue.value) / Number(marketRate[1].slice(1, ).replace(/\D/g, ""))))}** USD.\nRate used: **${numberWithCommas(Number(marketRate[1].slice(1,).replace(/\D/g, "")))}** LL.`;
			else out = `**${inputValue.value}** $ equals **${numberWithCommas(Number(inputValue.value) * Number(marketRate[1].slice(1,).replace(/\D/g, "")))}** LL.\nRate used: **${numberWithCommas(Number(marketRate[1].slice(1,).replace(/\D/g, "")))}** LL.`;
			
			
			await interaction.reply(out);

		} catch(error) {
			console.log(error);
			// it isn't possible to check rateData if it is not defined
			// cannot check if it is undefined so this will work as an alternative
			await interaction.reply("This command is currently unavailable.");
		}
    },
};