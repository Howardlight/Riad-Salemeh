import { Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";


export const github: CommandInt = {
    name:"github",
    description:"Links to the github of the bot",
    run: async (message: Message) => {message.channel.send("https://github.com/Howardlight/Riad-Salemeh-TS");}
}