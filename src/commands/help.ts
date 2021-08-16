import { Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { CommandList } from "./_CommandList";

export const help: CommandInt = {
    name: "help",
    description: "help command",
    run: async (message: Message, args: string[]) => {
        const data: string[] = [];
        const prefix = process.env.PREFIX as string;

        //CASE 1: HANDLES WHEN NO ARGS PROVIDED
        // If not Args were Provided,
        // NOTE: there will always be atleast
        // 1 arg, that being the command declared by user
        if(args.length === 1) {
            data.push(`Here's a list of all my commands: \n`);
            data.push(CommandList.map(command => command.name).join(", "));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);


            return message.author.send(data.join(" ").toString())
                .then(() => {
                    if(message.channel.type === 'DM') return;
                    message.reply(`I've sent you a DM with all my commands!`);
                })
                .catch(error => {
                    console.error(`Could not sent help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like i can\'t DM you! Do you have DMs disabled?');
                });
        }

        



    }
}