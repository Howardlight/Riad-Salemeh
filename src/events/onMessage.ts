import { Message, Collection } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { cooldowns } from "../index";

export const onMessage = async (message: Message, args?: string[]) => {

    // assert prefix is string for typescript
    const prefix = process.env.PREFIX as string;

    // if message is from bot, ignore
    if(message.author.bot) return;


    // handles Commands
    for(const Command of CommandList) {
        if (message.content.startsWith(prefix + Command.name)) {

            if (!cooldowns.has(Command.name)) {
                cooldowns.set(Command.name, new Collection());
            }

            const now = Date.now();
            const timestamps: any = cooldowns.get(Command.name);
            const cooldownAmount = (Command.cooldown || 3) * 1000;
            
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${Command.name}\` command.`);
                }
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); 


            try {
                await Command.run(message, args!);
            } catch (error) {
                console.log("Error At Try/Catch command run ", error);
            }
        }
    }
}