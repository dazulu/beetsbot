# BeetsBot

> A Twitch chat bot

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

An automated take on the popular Battle Royale genre. For a round, current members of chat are the active players. Players will randomly win 1v1 battles against other random players. There is a small chance a player can eliminate themselves. The last player alive is declared the winner.

![Battle Royale example](screenshots/battle-royale.jpg "Battle Royale example")

```bash
# To start Battle Royale from Stream chat
!br
```

- There must be 2 or more players and a game not already in progress.
- The command is **streamer-only**.

### Configuration

Battle Royale can be configured in `src/config.json`

| Setting                 | Type     | Description                               |
| ----------------------- | -------- | ----------------------------------------- |
| `prefix`                | `string` | Chat prefix for the bot messages in chat. |
| `selfEliminationChance` | `number` | Percentage chance of a self-elimination.  |
| `minMessageWait`        | `number` | Min time between actions in _ms_.\*       |
| `maxMessageWait`        | `number` | Max time between actions in _ms_.         |

_\*Keep `minMessageWait` upwards of 1000 or the bots messages will get throttled_
