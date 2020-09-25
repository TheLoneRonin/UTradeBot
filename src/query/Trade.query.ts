import { get } from 'superagent';
import { TronURL, RetrieveContract } from '../Config';

export async function TradeInfo() {
    const payload = await get(`${TronURL}`);
    return payload.body;
}