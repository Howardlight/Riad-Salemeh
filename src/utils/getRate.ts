// @ts-ignore
import CheerioAPI = cheerio.CheerioAPI;
import fetch from "node-fetch";
import * as cheerio from "cheerio";

// use Fetch to get the website 
const getRawData = (URL: string) => {
    return fetch(URL)
    .then((response: any) => response.text())
    .then((data: string) => {
        // console.log(data);
        return data;
    });
};

// website, might modify later
const URL: string = "https://lbprate.com/";

// Process the website then return List
// of desired values
//TODO: Add TSDocs
export const getWebsiteData = async () => {
    const lbpRaw = await getRawData(URL);
    const parsedData: CheerioAPI = cheerio.load(lbpRaw);

    let marketRateList: string[] = []; // i refers to the index, e refers to the element
    parsedData(".text-white").each(function (i: number, e: Element) {
        marketRateList[i] = parsedData(e).text();
    });

    let sayrafaRateList: string[] = [];
    parsedData(".text-white", "#sayrafaRate").each(function (i: number, e: Element) {
        sayrafaRateList[i] = parsedData(e).text();
    });

    let fuelRateList: string[] = [];
    parsedData(".text-white", "#fuelRate").each(function (i: number, e: Element) {
        fuelRateList[i] = parsedData(e).text();
    });

    //TODO: Clean this, add Docs
    marketRateList = [marketRateList[0], marketRateList[2], marketRateList[4]];
    sayrafaRateList = [marketRateList[0], sayrafaRateList[1], sayrafaRateList[3]]
    fuelRateList = [marketRateList[0], fuelRateList[1], fuelRateList[3], fuelRateList[5], fuelRateList[7], fuelRateList[9]]

    return [marketRateList, sayrafaRateList, fuelRateList];
};