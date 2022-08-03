import fetch from "node-fetch";

// export async function getLirarateAPIData(date: Date)  {

//     // Process Data
//     // Process String and concat it to URL
//     let URL: string = "https://lirarate.org/wp-json/lirarate/v2/rates?currency=LBP&_ver=t"
//     let version: string = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}`;
//     let API = URL.concat(version);

//     // Logs
//     // console.log("URL: ", URL);
//     // console.log("version: ", version);
//     // console.log("API: ", API);


//     const res: any = await fetch(API,{
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });
//     if(!res.ok) {
//         if(res.status === 404) throw console.error("404 RESPONSE ERROR at lirarate | getAPIData");
//         else if (res.status === 401) throw console.error("401 RESPONSE ERROR at lirarate | getAPIData\nAPI is not available at the moment");        
//     }
//     else {
//         const data = await res.json();
//         // console.log(data);
//         return data;
//     };
// };


// /**
//  * //TODO: Finish this
//  * @returns data: FuelResponse[] | undefined
//  */
// async function getFuelData() {

//     //TODO: Make this Safe, incase there is no response
    
//     // console.log(`getEESTTime: ${getEESTTime(3)}`);
//     let URL: string = `https://lirarate.org/wp-json/lirarate/v2/fuel?currency=LBP&_ver=t${formatTimeForLirarate(getEESTTime(3))}`;

//     try{
//         const res: any = await fetch(URL);
//         const data: FuelResponse[] = await res.json();

//         console.log(data);
//         return data;
//     } catch (error) {
//         console.log(error);
//         return undefined;
//     }
// }


// /**
//  * //TODO: finish this
//  * @returns [OCTANE95, OCTANE98, DIESEL, GAS, OIL] 
//  */
// export async function getLatestFuel() {
//     const data = await getFuelData();


//     if(data == undefined) return undefined;
//     //NOTE: RETURNS DATA WITHOUT DATE OF EACH ONE

//     const fuel = [];
//     fuel.push(data[0]["data"].pop()![1]); // OCTANE 95
//     fuel.push(data[1]["data"].pop()![1]); // OCTANE 98
//     fuel.push(data[2]["data"].pop()![1]); // DIESEL
//     fuel.push(data[3]["data"].pop()![1]); // GAS
//     fuel.push(data[4]["data"].pop()![1]); //BRENT CRUDE OIL (USD)

//     // console.log(fuel);
//     return fuel;
// }

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
// (GMT + 3) beirut
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


/**
 * TODO: finish this
 * @param time 
 * @returns string
 */
function formatTimeForLirarate(time: Date) {

    //TODO: optimize this
    const year = time.getFullYear();
    const month = time.getMonth();
    const day = time.getDate();
    const hour = time.getHours();

    return (`${year}${month+1}${day}${hour}`).toString();
}

export const quirkline = [
    "El lira b2alf 5er tfarrage:",
    "I did some handaset, and the new Lira value is:",
    "Your local serraf says:",
    "Ana ma 5assni, bss llira lyom:",
    "Bisallem 3lek Michel Aoun:",
    "Discount 51%, bss la 2elak:",
    // "100% safer than botler!",
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
