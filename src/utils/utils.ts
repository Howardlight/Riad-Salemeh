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
