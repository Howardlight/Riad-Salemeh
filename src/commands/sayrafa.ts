import {Message} from "discord.js";
import {CommandInt} from "../interfaces/CommandInt";

export const sayrafa: CommandInt = {
    name: "sayrafa",
    description: "Get the sayrafa rate along with the volume",
    run: async (message: Message) => {

        try{

            if(sayrafaRate[0] == "NULL") {
                await message.channel.send("This command is currently unavailable.");
                return ;
            }

            await message.channel.send(`The SAYRAFA rate is ${sayrafaRate[1]}\nVolume: ${sayrafaRate[2]}\n${sayrafaRate[0]}`);

        } catch(error) {
            console.log(error);
            await message.channel.send("This command is currently unavailable.");
        }
    }
}