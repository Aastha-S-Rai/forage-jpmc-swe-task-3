import {ServerRespond} from './DataStreamer';

export interface Row {
    price_abc: number,
    price_def: number,
    ratio: number,
    timestamp: Date,
    upper_limit: number,
    lower_limit: number,
    trigger: number | undefined,
}


export class DataManipulator {
    static generateRow(serverRespond: ServerRespond[]): Row {
        const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
        const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
        const ratio = priceABC / priceDEF;
        const upper = 1 + 0.03;
        const lower = 1 - 0.03;
        return {
            price_abc: priceABC,
            price_def: priceDEF,
            ratio,
            timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
                serverRespond[0].timestamp : serverRespond[1].timestamp,
            upper_limit: upper,
            lower_limit: lower,
            trigger: (ratio > upper || ratio < lower) ? ratio : undefined,
        };
    }
}