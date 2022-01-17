import { Client, Intents, Collection, Interaction } from "discord.js";
import { validateEnv } from "./utils/validateEnv";
import { onMessage } from "./events/onMessage";
import { onInteraction } from "./events/onInteraction";
import { getWebsiteData } from "./getRate";

const fs = require("fs");
const path = require("path");

export const interactions = new Collection();
const dirPath = path.resolve(__dirname, "./interactions");
const interactionFiles = fs.readdirSync(dirPath).filter((file: any) => file.endsWith('.js'));


// PlaceHolder values for when the bot is first instantiated
export var rateData:string[] = ["NULL", "NULL", "NULL", "NULL"];
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
    (async function loop() {
        setTimeout(function () {
            getWebsiteData()
            .then(data => {

                // TODO: current time as it is appears to be correct,
                // clean up this code,
                // then go to lbprate.ts and make the time readable

                // check if hours, in both cases add
                // var updatedTime = 0; 
                // if(data[0].includes("hours")) updatedTime = parseInt(data[0].replace(/[^0-9]/g,'')) * 60 * 60 * 1000 ;
                // else updatedTime = parseInt(data[0].replace(/[^0-9]/g,'')) * 60 * 1000 ; // assume it's minutes and process              
                
                // data[0] = updatedTime.toString();
                rateData = data;
                // console.log(rateData);
                }
            )
            // TODO: add timestamp for when request is made, add said request to RateData

            loop()
        }, 300000); // interval of the sequence // TODO: change this to 5 mins
    }());

    client.login(process.env.TOKEN);
})();