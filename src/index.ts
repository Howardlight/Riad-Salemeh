import { Client, GatewayIntentBits, Partials, Collection, Interaction, Message, CommandInteraction } from "discord.js";
import { validateEnv } from "./utils/validateEnv";
import { onMessage } from "./events/onMessage";
import { onInteraction } from "./events/onInteraction";
import { getWebsiteData } from "./getRate";

const fs = require("fs");
const path = require("path");

export const interactions = new Collection();
const dirPath = path.resolve(__dirname, "./interactions");
const interactionFiles = fs.readdirSync(dirPath).filter((file: String) => file.endsWith('.js'));

export const cooldowns = new Collection();
(async () => {

    // Validates Env variables
    // if assertion fails, stops the bot
    // if(!validateEnv) return;

    const PREFIX = process.env.PREFIX as string;
    const client = new Client(
        { intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages]}
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

    client.on("messageCreate", async (message: Message) => {
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
    (await async function loop() {
        setTimeout(function () {
            getWebsiteData()
                .then(data => {
                    // Assign The fetched data to the Globals
                    globalThis.marketRate = data[0];
                    globalThis.sayrafaRate = data[1];
                    globalThis.fuelRate = data[2];
                })
                .catch(async (error) => {
                    console.log(error);
                });

            loop()
        }, 10000);
    }());

    await client.login(process.env.TOKEN);
})();