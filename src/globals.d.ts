
//TODO: Make this safer, replace the NULL with better alternative
// this is terrible design

declare var marketRate: string[] = ["NULL", "NULL", "NULL", "NULL"];

declare var sayrafaRate: string[] = ["NULL", "NULL", "NULL"];

declare var fuelRate: string[] = ["NULL", "NULL", "NULL", "NULL", "NULL", "NULL"]

declare module 'cheerio' {
    interface Cheerio<T> {
        logHtml(this: Cheerio<T>): void;
    }
}