import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { quirkline } from "../utils/utils";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lbprate')
        .setDescription("Get current black market Lira rate"),
    async execute(interaction: CommandInteraction) {


        if(marketRate[1] === "NULL") {
            await interaction.reply("This command is currently unavailable.");
            return ;
        }
        // create the response, the extended response, concat then return
        const response = `${quirkline[Math.floor(Math.random()*quirkline.length)]}`;
        const extendedResponse = (`\nThe BUY rate is ${marketRate[1]}\nThe SELL rate is ${marketRate[2]}\n${marketRate[0]}`);
        await interaction.reply(response.concat(extendedResponse));
    },
};