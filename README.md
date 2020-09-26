# UTradeBot

[![Build Status](https://travis-ci.org/TheLoneRonin/UTradeBot.svg?branch=master)](https://travis-ci.org/TheLoneRonin/UTradeBot)

This bot intends to be both a trading and information bot.
It provides key data on Smart Contracts for Unifi on Tron.

---

## Getting Started

Install `node_modules`

```bash
npm install
# or
yarn
```

Configure your bot token(s)

```bash
export TELEGRAM_TOKEN='YOUR_TG_TOKEN'
```

Then run the bot

```
npm run start
# or
yarn start
```

## Commands

In Telegram, you can message the bot the following:

### /start or /help

Displays helpful information about the bot

Example output:

```bash
This bot displays the prices for Unifi.

You can run /tokens to display all available tokens.
You can also run /summary <token> to display trade related information for that token.
```

### /tokens

Displays all available tokens that you can retrieve information about

Example Output:

```bash
Available Tokens:

SEED
USDT
UP
KLV
WIN
BNKR
JFI
SUN
JST
USDJ
DZI
DICE
MX
DFK
PEARL
TAI
LIVE
JT
ANK
BRG
SOUL
888
```

### /summary <token>

Displays a summary of information about a token

```bash
Summary for SEED:

Price:      1.171186 TRX
APY:        5.971544%

SEED Stats
Liquidity:  3353819.003343 SEED
Volume:     182899.482689 SEED

TRX Stats
Liquidity:  3927949.058295 TRX
Volume:     214209.31353259916 TRX
```

