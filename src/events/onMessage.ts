import { Message } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const onMessage = async (message: Message, args?: string[]) => {

    // assert prefix is string for typescript
    const prefix = process.env.PREFIX as string;

    // if message is from bot, ignore
    if(message.author.bot) return;


    // handles Commands
    for(const Command of CommandList) {
        if (message.content.startsWith(prefix + Command.name)) {

            
            // if(args?.length! > 1) {
                await Command.run(message, args!);
            // } else Command.run(message, args!);

            // await Command.run(message, args);
        
        
            break;
        
        
        }
    }
}