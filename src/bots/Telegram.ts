import Bot, { Message } from 'telegram-api';
import { TelegramToken } from '../Config';
import { TradeInfo } from '../query/Trade.query';

export const TelegramBot = new Bot({
    token: TelegramToken
});

export const HelpText = `\
This bot displays the prices for Unifi.

You can run /tokens to display all available tokens.
You can also run /summary <token> to display trade related information for that token.
`

TelegramBot.command('start', message => {
    const response = new Message().text(HelpText).to(message.chat.id);
    TelegramBot.send(response);
});

TelegramBot.command('help', message => {
    const response = new Message().text(HelpText).to(message.chat.id);
    TelegramBot.send(response);
});

TelegramBot.command('tokens', async message => {
    const Info = await TradeInfo();

    let text = `Available Tokens:\n\n`;

    Info.forEach(Token => {
        text += `${Token.name}\n`;
    });

    const response = new Message()
        .text(text)
        .to(message.chat.id);

    TelegramBot.send(response);
})

TelegramBot.command('summary <token>', async message => {
    const token = message.args.token.toUpperCase();

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

    const response = new Message()
        .text(text)
        .to(message.chat.id);

    TelegramBot.send(response);
});