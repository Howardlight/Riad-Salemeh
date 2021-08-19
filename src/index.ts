import { Client, Intents, Collection } from "discord.js";
import { validateEnv } from "./utils/validateEnv";
import { onMessage } from "./events/onMessage";


export const cooldowns = new Collection();
(async () => {


    //TODO: Add mv -i -v public dist/ && rm -v -rf src to postInstall
    // CHECK : https://medium.com/developer-rants/deploying-typescript-node-js-applications-to-heroku-81dd75424ce0
    //TODO: Remove Build or postinstall, since heroku ends up building the bot TWICE

    // Validates Env variables
    // if assertion fails, stops the bot
    if(!validateEnv) return;

    const PREFIX = process.env.PREFIX as string;

    const client = new Client(
        { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]}
    );

    client.once("ready", ()=> {
        client.user?.setActivity("with your Dollars");
        console.log(`Logged in as ${client.user?.username}! | ${client.user?.id}`);
    });

    client.on("messageCreate", async (message) => {
        
        // creates the Argument List, then passes it with the message to Event Handler 
        var args: string[] = message.content.slice(PREFIX.length).trim().split(/ +/);
        await onMessage(message, args);
    });


    client.login(process.env.TOKEN);
})();