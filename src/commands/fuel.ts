import {Message} from "discord.js";
import {CommandInt} from "../interfaces/CommandInt";

export const fuel: CommandInt = {
    name: "fuel",
    description: "Get price of fuel in LL",
    run: async (message: Message) => {

        try{

            const fuel = fuelRate;

            if(fuel[0] == "NULL") {
                await message.channel.send("This command is currently unavailable.");
                return ;
            }

            await message.channel.send(`Octane 95: ${fuel[1]}\nOctane 98: ${fuel[2]}\nDiesel: ${fuel[3]}\nGas: ${fuel[4]}\nCrude Oil: ${fuel[5]}\n${fuel[0]}`);

        } catch(error) {
            console.log(error);
            await message.channel.send("This command is currently unavailable.");
        }
    }
}