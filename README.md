# BeetsBot

> Twitch bot for IrishBeets

## Setup

We need to set a few environment variables for the bot to be able to auth and connect to a Twitch channel. These can be included in a _.env_ file, which will be imported.

`BOT_USERNAME`: Username of the bot's Twitch account

`OAUTH_TOKEN`: OAuth token for authentication

`CHANNEL_NAME`: Name of the channel to connect to

## Build

```bash
# install dependencies
$ npm install

# serve with nodemon and babel compilation
$ npm run start
```

## Battle Royale

Typing `!br` in chat will start a Battle Royale game if there are 2 or more players and a Battle Royale game is not already in progress. This command is streamer-only.

### Configuration

Battle Royale can be configured in `src/config.json`

```json
prefix: "<BR>" // chat prefix for the bot messages in chat
selfEliminationChance: 8 // percentage chance of a self-elimination
minMessageWait: 10000 // min time between actions in milliseconds
maxMessageWait: 30000 // max time between actions in milliseconds
```
