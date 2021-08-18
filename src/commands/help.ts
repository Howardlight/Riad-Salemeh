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


        // Grabs the first arg from command call,
        // looks for it in CommandList,
        // if found return its info
        // else prompt not found
        // console.log(args);
        var argument: CommandInt["name"] = args[1];
        var SearchedCommand = CommandList.find( el => el["name"] === argument);
        if(SearchedCommand === undefined || SearchedCommand.name === "list") {
            message.reply("That\'s not a valid command.");
        } else {


            console.log(SearchedCommand);

            data.push(`**Name**: ${SearchedCommand?.name}`);

            if(SearchedCommand?.aliases) data.push(`**aliases**: ${SearchedCommand.aliases.join(", ")}`);
            data.push(`**Description**: ${SearchedCommand?.description}`);
            if(SearchedCommand?.usage) data.push(`**Usage**: ${prefix}${SearchedCommand.name} ${SearchedCommand.usage}`);

            data.push(`**Cooldown**: ${SearchedCommand?.cooldown || 3} second(s)`);


            message.channel.send(data.join("\n").toString());
        }

    }
}