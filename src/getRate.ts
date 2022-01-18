const Cheerio = require("../node_modules/cheerio");
const fetch = require("../node_modules/node-fetch");

// use Fetch to get the website 
const getRawData = (URL: string) => {
    return fetch(URL)
    .then((response: Response) => response.text())
    .then((data: string) => {
        return data;
    });
};

// website, might modify later
const URL: string = "https://lbprate.com/";

// Process the website then return List
// of desired values
export const getWebsiteData = async () => {
    const lbpRaw = await getRawData(URL);
    const parsedData = Cheerio.load(lbpRaw);

    let list: string[] = []; // i refers to the index, e refers to the element
    parsedData(".text-white").each(function (i: any, e: Element) {
        list[i] = parsedData(e).text();
    });
    const out:string[] = [list[0], list[2], list[4]];

    return out;
};