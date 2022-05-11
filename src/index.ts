import { Client, Intents, Collection, Interaction } from "discord.js";
import { validateEnv } from "./utils/validateEnv";
import { onMessage } from "./events/onMessage";
import { onInteraction } from "./events/onInteraction";
import { getWebsiteData } from "./getRate";
import { getLirarateAPIData, getEESTTime } from "./utils/utils";
import { liraResponse } from "./interfaces/CommandInt";

const fs = require("fs");
const path = require("path");

export const interactions = new Collection();
const dirPath = path.resolve(__dirname, "./interactions");
const interactionFiles = fs.readdirSync(dirPath).filter((file: String) => file.endsWith('.js'));


// PlaceHolder values for when the bot is first instantiated
export var rateData:string[] = ["NULL", "NULL", "NULL", "NULL"];
export var liraData: liraResponse = {
    buy: [],
    sell: [],
};

export const cooldowns = new Collection();
(async () => {

    // Validates Env variables
    // if assertion fails, stops the bot
    if(!validateEnv) return;

    const PREFIX = process.env.PREFIX as string;
    const client = new Client(
        { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]}
    );

    for (const file of interactionFiles) {
        const command = require(`./interactions/${file}`);
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        interactions.set(command.data.name, command);
    }


    // EVENT LISTENERS
    client.once("ready", ()=> {
        client.user?.setActivity("with your Dollars");
        console.log(`Logged in as ${client.user?.username}! | ${client.user?.id}`);
    });

    client.on("messageCreate", async (message) => {
        if(!message.content.startsWith(PREFIX)) return ;
        // creates the Argument List, then passes it with the message to Event Handler 
        var args: string[] = message.content.slice(PREFIX.length).trim().split(/ +/);
        await onMessage(message, args);
    });

    client.on('interactionCreate', async (interaction: Interaction) => {

        // TODO: Implement args
        await onInteraction(interaction);
    });


    // LEBANESE RATE SUBSEQUENCE
    const creatorId = client.users.cache.get("689419768666521631");
    (await async function loop() {
        setTimeout(function () {
            getWebsiteData()
                .then(data => rateData = data)
                .catch(async (error) => {
                    console.log(error);
                    await creatorId!.send(Date.now() + " | an error occured: ");
                    await creatorId!.send(error);
                });

            const nowDate = getEESTTime(2);
            getLirarateAPIData(nowDate)
                .then(data => liraData = data)
                .catch(async (error) => {
                    console.log(error);
                    await creatorId!.send(Date.now() + " | an error occured: ");
                    await creatorId!.send(error);
                });

            loop()
        }, 300000);
    }());

    await client.login(process.env.TOKEN);
})();