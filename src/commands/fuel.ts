import {Message} from "discord.js";
import {CommandInt} from "../interfaces/CommandInt";
import { getLatestFuel } from "../utils/utils";

export const fuel: CommandInt = {
    name: "fuel",
    description: "Get price of fuel in LL",
    run: async (message: Message) => {

        try{

            const fuel = await getLatestFuel();

            if(fuel == undefined) {
                await message.channel.send("This command is currently unavailable.");
                return ;
            }

            await message.channel.send(`Octane 95: ${fuel[0]}LL\nOctane 98: ${fuel[1]}LL\nDiesel: ${fuel[2]}LL\nGas: ${fuel[3]}LL\nCrude Oil: ${fuel[4]}$`);

        } catch(error) {
            console.log(error);
            await message.channel.send("This command is currently unavailable.");
        }
    }
}