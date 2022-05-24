import { Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { numberWithCommas } from "../utils/utils";

export const convert: CommandInt = {
    name: "convert",
    description: "Converts number of dollars given to Lira at current black market rate",
    run: async (message: Message, args: string[]) => {
        
        // Check if rateData is valid
        if(rateData[1] === "NULL") {
            await message.channel.send("This command is currently unavailable.");
            return ;
        }

        // Check if given number is valid
        if(isNaN( Number(args[1]) )) {
            await message.reply("Given Argument must be a number.\nExample: `//convert 25`");
            return ;
        }

        await message.channel.send(`**${numberWithCommas(Number(args[1]))}** $ equals **${ numberWithCommas(Number(args[1]) * Number(rateData[1].slice(1, ).replace(/\D/g, ""))) }** LL.\nRate used: **${numberWithCommas(Number(rateData[1].slice(1, ).replace(/\D/g, "")))}** LL.`);
    }
}