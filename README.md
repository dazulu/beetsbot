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
