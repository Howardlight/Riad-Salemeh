import { Guild, Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";

export const list: CommandInt = {
    name: "list",
    description: "You're not supposed to see this",
    run: async (message: Message) => {

        const { author, channel } = message;
        if( author.id === "689419768666521631") {
            let list: String[] = [];

            message.client.guilds.cache.forEach(guild => {
                list.push(`${guild.name} | ${guild.id}`);
            })

            channel.send(list.join("\n").toString());
        } else return ;
    }
}