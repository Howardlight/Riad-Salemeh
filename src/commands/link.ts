import { Message, EmbedBuilder } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";

export const link: CommandInt = {
    name: "link",
    description: "Returns an invite link to the bot, which can be used to invite the bot to servers",
    run: async (message: Message) => {

        const embed = new EmbedBuilder()
        .setDescription("[Click Me](https://discord.com/api/oauth2/authorize?client_id=826815896718540850&permissions=2147535872&scope=bot%20applications.commands) to invite the bot!")
        .addFields(
            // { name: '\u200B', value: '\u200B' },
            { name: "Or copy and paste the following link to your browser:", value: '`https://discord.com/api/oauth2/authorize?client_id=826815896718540850&permissions=2147535872&scope=bot%20applications.commands`' }
        )
        
        message.channel.send({ embeds: [embed ]});
    }
}