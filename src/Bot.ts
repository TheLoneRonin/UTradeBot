import 'colors';
import { TelegramBot } from './bots/Telegram';
import { TradeInfo } from './query/Trade.query';

export async function Start() {
    console.log(await TradeInfo());

    console.log(`Starting Telegram Bot`.green);
    TelegramBot.start();
    console.log(`Successfully started Telegram Bot\n`.green);
}

(() => Start())();