import { Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";

export const link: CommandInt = {
    name: "link",
    description: "Returns an invite link to the bot, which can be used to invite the bot to servers",
    run: async (message: Message) => {
        message.channel.send(
            //OUTDATED
            //TODO: update this
            // "https://discord.com/oauth2/authorize?client_id=826815896718540850&scope=bot&permissions=36826705"
            "The link is currently outdated, check later"
        );
    }
}