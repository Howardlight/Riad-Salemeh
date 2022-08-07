import { Client, GatewayIntentBits, Collection, Interaction } from "discord.js";
import { validateEnv } from "./utils/validateEnv";
import { onInteraction } from "./events/onInteraction";
import { getWebsiteData } from "./utils/getRate";

const fs = require("fs");
const path = require("path");

export const interactions = new Collection();
const dirPath = path.resolve(__dirname, "./interactions");
const interactionFiles = fs.readdirSync(dirPath).filter((file: String) => file.endsWith('.js'));

(async () => {

    // Validates Env variables
    // if assertion fails, stops the bot
    if(!validateEnv) return;

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