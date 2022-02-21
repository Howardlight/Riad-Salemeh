// const Cheerio = require("../../node_modules/cheerio");
const fetch = require("../../node_modules/node-fetch");
import { Message } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";

// Get Date from API
const getAPIData = async (date: Date) => {

    // Process Data
    // Process String and concat it to URL
    let URL: string = "https://lirarate.org/wp-json/lirarate/v2/rates?currency=LBP&_ver=t"
    let version: string = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}`;
    let API = URL.concat(version);

    // Logs
    // console.log("URL: ", URL);
    // console.log("version: ", version);
    // console.log("API: ", API);


    const res: Response = await fetch(API,{
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(!res.ok) {
        if(res.status === 404) console.error("404 RESPONSE ERROR at lirarate | getAPIData");
        else if (res.status === 401) console.error("401 RESPONSE ERROR at lirarate | getAPIData\nAPI is not available at the moment");
        return {};
    }
    else {
        const data = await res.json();
        console.log(data);
        return data;
    };

};

function timeDiffCalc(futureDate: Date, nowDate: Date) {
    let diffInMilliSeconds = Math.abs(futureDate.getTime() - nowDate.getTime()) / 1000;

    // calculate days
    // const days = Math.floor(diffInMilliSeconds / 86400);
    // diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    // if (days > 0) {
    //     difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    // }

    difference += hours === 0 
    ? `` 
    : hours === 1 
    ? `1 hour, `
    : `${hours} hours,`;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 

    return difference;
}

// Eastern european standard time
// (GMT + 2) beirut
function getEESTTime(offset: number) {
    // create Date object for current location
    var d: Date = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    return nd;
}


export const lirarate: CommandInt = {
    name: "lirarate",
    description: "use Fetch and Cheerio to get the LBP rate",
    run: async (message: Message) => {

        const nowDate: Date = getEESTTime(2);
        const rates = await getAPIData(nowDate);
        if(!("buy" in rates)) console.error(`Lirarate | getAPIData | rates | VALUE IS NULL`);
        else {

            // get values
            const buyRate = rates["buy"].pop();
            const sellRate = rates["sell"].pop();


            // These 2 should be the same, no need to store them both
            const buyDate: Date = new Date(buyRate[0]);
            // const sellDate: Date = new Date(sellRate[0]); 


            // console.log(sellDate.toLocaleTimeString());
            // console.log(buyDate.toLocaleTimeString());

            // console.log(timeDiffCalc(buyDate, nowDate));
            const timeDiff: string = timeDiffCalc(buyDate, nowDate);

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
            const response = `${quirkline[Math.floor(Math.random() * quirkline.length)]}`;
            const extendedResponse = (`\nThe BUY rate is ${buyRate[1]}\nThe SELL rate is ${sellRate[1]}\n Updated ${timeDiff} ago`);
            await message.channel.send(response.concat(extendedResponse));
        }
    }
}