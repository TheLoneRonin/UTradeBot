import Bot = require('node-telegram-bot-api');
import { TelegramToken } from '../Config';
import { TradeInfo } from '../query/Trade.query';

export const TelegramBot = new Bot(TelegramToken, { polling: true });

export const HelpText = `\
This bot displays the prices for Unifi.

You can run /tokens to display all available tokens.
You can also run /summary <token> to display trade related information for that token.
`;

export async function Summary(message, token) {
    let text = ``;
    let foundToken = false;

    if (token) {
        const Info = await TradeInfo();

        text = `Summary for ${token}:\n\n`;
    
        Info.forEach(Token => {
            if (Token.name === token) {
                foundToken = true;
                const PairVolume = Token.price * Token.volume;
    
                text += `Price:      ${Token.price} ${Token.againstToken}\n`;
                text += `APY:        ${(PairVolume * 0.003 / Token.liquidityB * 100 * 365).toFixed(6)}%\n\n`;
    
                text += `${Token.name} Stats\n`;
                text += `Liquidity:  ${Token.liquidityA} ${Token.name}\n`;
                text += `Volume:     ${Token.volume} ${Token.name}\n\n`;
    
                text += `${Token.againstToken} Stats\n`;
                text += `Liquidity:  ${Token.liquidityB} ${Token.againstToken}\n`;
                text += `Volume:     ${PairVolume} ${Token.againstToken}`;
            }
        });
    }

    if (!foundToken) {
        text = `Please provide a valid token, example usage /summary SEED`;
    }

    TelegramBot.sendMessage(
        message.chat.id,
        text,
        {
            reply_markup: JSON.stringify({
                inline_keyboard: token ? [
                    [{ text: 'Refresh', callback_data: token }],
                ] : [],
            }),
        }
    );
}

TelegramBot.onText(/\/tokens/, async message => {
    const Info = await TradeInfo();

    let text = `Available Tokens:\n\n`;

    Info.forEach(Token => {
        text += `${Token.name}\n`;
    });

    TelegramBot.sendMessage(message.chat.id, text);
})

TelegramBot.onText(/\/summary (.+)/, async (message, args) => {
    const token = args.length > 0  ? args[1] : null;
    await Summary(message, token);
});

TelegramBot.on('message', message => {
    if (message.text === '/start' || message.text === '/help') {
        TelegramBot.sendMessage(message.chat.id, HelpText);
    }
});

TelegramBot.on('callback_query', query => {
    const token = query.data;
    const message = query.message;

    Summary(message, token);
});

TelegramBot.on('polling_error', error => {
    console.log('Polling error', error);
})