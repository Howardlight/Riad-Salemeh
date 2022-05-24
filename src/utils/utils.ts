const fetch = require("../../node_modules/node-fetch");

export async function getLirarateAPIData(date: Date)  {

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
        if(res.status === 404) throw console.error("404 RESPONSE ERROR at lirarate | getAPIData");
        else if (res.status === 401) throw console.error("401 RESPONSE ERROR at lirarate | getAPIData\nAPI is not available at the moment");        
    }
    else {
        const data = await res.json();
        // console.log(data);
        return data;
    };
};

export function timeDiffCalc(futureDate: Date, nowDate: Date) {
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
    : `${hours} hours, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 

    return difference;
};

// Eastern european standard time
// (GMT + 2) beirut
export function getEESTTime(offset: number) {
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
};

export const quirkline = [
    "El lira b2alf 5er tfarrage:",
    "I did some handaset, and the new Lira value is:",
    "Your local serraf says:",
    "Ana ma 5assni, bss llira lyom:",
    "Bisallem 3lek Michel Aoun:",
    "Discount 51%, bss la 2elak:",
    "100% safer than botler!",
];

/**
 *  Takes number and returns it with a comma every 3 digits
 * 
 *  Ex: 1234567 (number) ==> 1,234,567 (string)
 * @param x 
 * @returns string
 */
export function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
