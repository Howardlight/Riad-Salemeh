// const Cheerio = require("../../node_modules/cheerio");
const fetch = require("../../node_modules/node-fetch");
import { Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import {
    getLirarateAPIData,
    timeDiffCalc,
    getEESTTime,
} from "../utils/utils";

export const lirarate: CommandInt = {
    name: "lirarate",
    description: "use Fetch and Cheerio to get the LBP rate",
    run: async (message: Message) => {

        const nowDate: Date = getEESTTime(2);
        const rates = await getLirarateAPIData(nowDate);
        if(!("buy" in rates)) console.error(`Lirarate | getAPIData | rates | VALUE IS NULL`);
        else {

            // get values
            const buyRate = rates["buy"].pop();
            const sellRate = rates["sell"].pop();


            // These 2 should be the same, no need to store them both
            const buyDate: Date = new Date(buyRate[0]);
            // const sellDate: Date = new Date(sellRate[0]); 


            // console.log(sellDate.toLocaleTimeString());
            // console.log(buyDate.toLocaleTimeString());

            // console.log(timeDiffCalc(buyDate, nowDate));
            const timeDiff: string = timeDiffCalc(buyDate, nowDate);

            // quirklines on the top
            const quirkline = [
                "El lira b2alf 5er tfarrage:",
                "I did some handaset, and the new Lira value is:",
                "Your local serraf says:",
                "Ana ma 5assni, bss llira lyom:",
                "Bisallem 3lek Michel Aoun:",
                "Discount 51%, bss la 2elak:",
            ];

            // create the response, the extended response, concat then return
            const response = `${quirkline[Math.floor(Math.random() * quirkline.length)]}`;
            const extendedResponse = (`\nThe BUY rate is ${buyRate[1]}\nThe SELL rate is ${sellRate[1]}\n Updated ${timeDiff} ago`);
            await message.channel.send(response.concat(extendedResponse));
        }
    }
}