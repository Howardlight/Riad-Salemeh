const { CommandInteraction } = require("@discordjs/builders");
import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sayrafa')
        .setDescription("Get the sayrafa rate along with the volume"),
    async execute(interaction: typeof CommandInteraction) {

        if(sayrafaRate[0] === "NULL") {
            await interaction.reply("This command is currently unavailable.");
            return ;
        }
        await interaction.reply(`The SAYRAFA rate is ${sayrafaRate[1]}\nVolume: ${sayrafaRate[2]}\n${sayrafaRate[0]}`);
    },
};