import {Message} from "discord.js";
import {CommandInt} from "../interfaces/CommandInt";
import {quirkline} from "../utils/utils";


export const lbprate: CommandInt = {
    name: "lbprate",
    description: "Get current black market Lira rate",
    run: async (message: Message) => {

        if (marketRate[0] === "NULL") {
            await message.channel.send("This command is currently unavailable.");
            return ;
        }
        // create the response, the extended response, concat then return
        const response = `${quirkline[Math.floor(Math.random() * quirkline.length)]}`;
        const extendedResponse = (`\nThe BUY rate is ${marketRate[1]}\nThe SELL rate is ${marketRate[2]}\n${marketRate[0]}`);
        await message.channel.send(response.concat(extendedResponse));
    }
}