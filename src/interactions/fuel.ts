const { CommandInteraction } = require("@discordjs/builders");
import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fuel')
        .setDescription("Get price of fuel in LL"),
    async execute(interaction: typeof CommandInteraction) {


        if(fuelRate[0] === "NULL") {
            await interaction.reply("This command is currently unavailable.");
            return ;
        }

        await interaction.reply(`Octane 98: ${fuelRate[1]}\nOctane 95: ${fuelRate[2]}\nGas: ${fuelRate[3]}\nDiesel: ${fuelRate[4]}\nCrude Oil: ${fuelRate[5]}\n${fuelRate[0]}`);
    },
};