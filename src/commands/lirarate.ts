// const Cheerio = require("../../node_modules/cheerio");
const fetch = require("../../node_modules/node-fetch");
import { Message } from "discord.js";

import { CommandInt } from "../interfaces/CommandInt";

// use Fetch to get the website 
const getAPIData = async (date: Date) => {
    
    let URL: string = "https://lirarate.org/wp-json/lirarate/v2/rates?currency=LBP&_ver=t"
    let version: string = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}`;
    let API = URL.concat(version);
    console.log("URL: ", URL);
    console.log("version: ", version);
    console.log("API: ", API);

    const res: Response = await fetch(API);
    if(!res.ok) {
        console.error("RESPONSE ERROR");
        return null;
    }
    else {
        const data: JSON = await res.json();
        // console.log(data);
        return data;
    };
};

// website, might modify later
// let date =  new Date(Date.now());
// let URL: string = "https://lirarate.org/wp-json/lirarate/v2/rates?currency=LBP&_ver=t"
// let version: string = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}`;
// let API = URL.concat(version);
// console.log("URL: ", URL);
// console.log("version: ", version);
// console.log("API: ", API);

export const lirarate: CommandInt = {
    name: "lirarate",
    description: "use Fetch and Cheerio to get the LBP rate",
    run: async (message: Message) => {

        const date: Date = new Date(Date.now());
        const rates = await getAPIData(date);

        console.log("rates: ", rates);

        // quirklines on the top
        const quirkline = [
            "El lira b2alf 5er tfarrage:",
            "I did some handaset, and the new Lira value is:",
            "Your local serraf says:",
            "Ana ma 5assni, bss llira lyom:",
            "Bisallem 3lek Michel Aoun:",
            "Discount 51%, bss la 2elak:",
        ];
        
        // create the response, the extended response, concat then return
        // const response = `${quirkline[Math.floor(Math.random()*quirkline.length)]}`;
        // const extendedResponse = (`\nThe BUY rate is ${buyRate[2]}\nThe SELL rate is ${buyRate[4]}\n${buyRate[0]}`);
        // await message.channel.send(response.concat(extendedResponse));
    }
}