import { Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { rateData } from "..";

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

        else await message.channel.send(`**${args[1]}** $ equals **${ Number(args[1]) * Number(rateData[1].slice(1, ).replace(/\D/g, ""))}** LL.\nRate used: **${rateData[1].slice(1, ).replace(/\D/g, "")}** LL`);
    }
}