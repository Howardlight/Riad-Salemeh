import {Message} from "discord.js";
import {CommandInt} from "../interfaces/CommandInt";

export const fuel: CommandInt = {
    name: "fuel",
    description: "Get price of fuel in LL",
    run: async (message: Message) => {

        try{

            if(fuelRate[0] == "NULL") {
                await message.channel.send("This command is currently unavailable.");
                return ;
            }

            await message.channel.send(`Octane 98: ${fuelRate[1]} per 20L\nOctane 95: ${fuelRate[2]} per 20L\nGas: ${fuelRate[3]} per (LPG)10KG\nDiesel: ${fuelRate[4]} per 20L\nCrude Oil: ${fuelRate[5]}\n${fuelRate[0]}`);

        } catch(error) {
            console.log(error);
            await message.channel.send("This command is currently unavailable.");
        }
    }
}