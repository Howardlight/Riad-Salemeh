import {Message} from "discord.js";
import {CommandInt} from "../interfaces/CommandInt";

export const sayrafa: CommandInt = {
    name: "sayrafa",
    description: "Get the sayrafa rate along with the volume",
    run: async (message: Message) => {

        try{

            const sayrafa = sayrafaRate;

            if(sayrafa[0] == "NULL") {
                await message.channel.send("This command is currently unavailable.");
                return ;
            }

            await message.channel.send(`The SAYRAFA rate is ${sayrafa[1]}\nVolume: ${sayrafa[2]}\n${sayrafa[0]}`);

        } catch(error) {
            console.log(error);
            await message.channel.send("This command is currently unavailable.");
        }
    }
}