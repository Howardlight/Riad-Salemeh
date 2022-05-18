const { CommandInteraction } = require("@discordjs/builders");
import { SlashCommandBuilder } from "@discordjs/builders";
import { quirkline } from "../utils/utils";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lbprate')
        .setDescription("use Fetch and Cheerio to get the LBP rate"),
    async execute(interaction: typeof CommandInteraction) {


        if(rateData[1] === "NULL") {
            await interaction.reply("This command is currently unavailable.");
            return ;
        }
        // create the response, the extended response, concat then return
        const response = `${quirkline[Math.floor(Math.random()*quirkline.length)]}`;
        const extendedResponse = (`\nThe BUY rate is ${rateData[1]}\nThe SELL rate is ${rateData[2]}\n${rateData[0]}`);
        await interaction.reply(response.concat(extendedResponse));
    },
};