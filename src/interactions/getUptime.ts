const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Returns uptime of the bot'),
	async execute(interaction: typeof CommandInteraction) {


        var uptime = process.uptime();
        // console.log("Uptime raw:", uptime)
        const date = new Date(uptime*1000);
        const days = date.getUTCDate() - 1,
              hours = date.getUTCHours(),
              minutes = date.getUTCMinutes();

        let segments = [];

        if (days > 0) segments.push(days + ' day' + ((days == 1) ? '' : 's'));
        if (hours > 0) segments.push(hours + ' hour' + ((hours == 1) ? '' : 's'));
        if (minutes > 0) segments.push(minutes + ' minute' + ((minutes == 1) ? '' : 's'))
        // If Uptime is less than a minute, push said String to segments
        else segments.push("Less than a minute");
        
        const dateString = segments.join(', ');
        await interaction.reply(`${dateString.toString()}.`);
    },
};