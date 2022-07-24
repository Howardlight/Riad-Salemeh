

declare var rateData: string[] = ["NULL", "NULL", "NULL", "NULL"];

declare module 'cheerio' {
    interface Cheerio<T> {
        logHtml(this: Cheerio<T>): void;
    }
}