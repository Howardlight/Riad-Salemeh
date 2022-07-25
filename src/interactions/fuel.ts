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

        await interaction.reply(`Octane 98: ${fuelRate[2]}\nOctane 95: ${fuelRate[1]}\nGas: ${fuelRate[4]}\nDiesel: ${fuelRate[3]}\nCrude Oil: ${fuelRate[5]}\n${fuelRate[0]}`);
    },
};