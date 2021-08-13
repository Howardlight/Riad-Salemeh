import { Client, Intents } from "discord.js";
import { validateEnv } from "./utils/validateEnv";


(async () => {

    // Validates Env variables
    // if assertion fails, stops the bot
    if(!validateEnv) return;

    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]})

    client.once("ready", ()=> {
        client.user?.setActivity("with your Dollars");
        console.log(`Logged in as ${client.user?.username}! | ${client.user?.id}`);
    });


    client.login(process.env.TOKEN);
})();