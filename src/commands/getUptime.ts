import { Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";

export const getUptime: CommandInt = {
    name: "uptime",
    description: "Returns the uptime of the bot",
    run: async (message: Message) => {
        
        var uptime = process.uptime();
        const date = new Date(uptime*1000);
        const days = date.getUTCDate() - 1,
              hours = date.getUTCHours(),
              minutes = date.getUTCMinutes();

        let segments = [];

        if (days > 0) segments.push(days + ' day' + ((days == 1) ? '' : 's'));
        if (hours > 0) segments.push(hours + ' hour' + ((hours == 1) ? '' : 's'));
        if (minutes > 0) segments.push(minutes + ' minute' + ((minutes == 1) ? '' : 's'))
        // If Uptime is less than a minute, push said String to segments
        else segments.push("Less than a minute");
        

        const dateString = segments.join(', ');
        message.channel.send(`${dateString.toString()}.`);
    }
}