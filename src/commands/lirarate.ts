// const Cheerio = require("../../node_modules/cheerio");
const fetch = require("../../node_modules/node-fetch");
import { Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import {
    timeDiffCalc,
    getEESTTime,
    quirkline
} from "../utils/utils";
import { liraData } from "..";

export const lirarate: CommandInt = {
    name: "lirarate",
    description: "Returns LBP rate from Lirarate.com",
    run: async (message: Message) => {

        const nowDate: Date = getEESTTime(2);
        const rates = liraData;

        if (rates.buy.length === 0) {
            console.error(`Lirarate | getAPIData | rates | VALUE IS NULL`, rates);
            await message.channel.send("This command is currently unavailable.");
        } else {

            // get values
            const buyRate = rates["buy"].slice(-1);
            const sellRate = rates["sell"].slice(-1);


            // These 2 should be the same, no need to store them both
            const buyDate: Date = new Date(buyRate[0][0]);
            // const sellDate: Date = new Date(sellRate[0][0]);


            // console.log(sellDate.toLocaleTimeString());
            // console.log(buyDate.toLocaleTimeString());

            // console.log(timeDiffCalc(buyDate, nowDate));
            const timeDiff: string = timeDiffCalc(buyDate, nowDate);

            // create the response, the extended response, concat then return
            const response = `${quirkline[Math.floor(Math.random() * quirkline.length)]}`;
            const extendedResponse = (`\nThe BUY rate is 1 USD at ${buyRate[0][1]} LBP\nThe SELL rate is 1 USD at ${sellRate[0][1]} LBP\n Updated ${timeDiff} ago`);
            await message.channel.send(response.concat(extendedResponse));
        }
    }
}