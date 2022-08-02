import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('Returns link to invite the bot'),
	async execute(interaction: CommandInteraction) {

		const embed = new EmbedBuilder()
        .setDescription("[Click Me](https://discord.com/api/oauth2/authorize?client_id=826815896718540850&permissions=2147535872&scope=bot%20applications.commands) to invite the bot!")
        .addFields(
            // { name: '\u200B', value: '\u200B' },
            { name: "Or copy and paste the following link to your browser:", value: '`https://discord.com/api/oauth2/authorize?client_id=826815896718540850&permissions=2147535872&scope=bot%20applications.commands`' }
        )

		// https://discord.com/oauth2/authorize?client_id=826815896718540850&scope=bot&permissions=36826705
        await interaction.reply({ embeds: [embed]});
	},
};