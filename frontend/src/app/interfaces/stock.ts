export interface stock{
    symbol: string;
    date: string;
    close: number;
    series: string;
    open: number;
    high: number;
    low: number;
    last: number;
    prevclose: number;
    tottrdqty: number;
    tottrdval: number;
    timestamp: string;
    totaltrades: number;
    isin: string;
}

export interface day {
    date: string;
}

export const BACKEND_URL ="https://stock-analysis-gkb3ffggaja8e3bn.centralindia-01.azurewebsites.net";

