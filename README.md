# BeetsBot

> A Twitch chat bot

## Features

- [Battle Royale](#battle-royale)
- [Throw/Catch](#throwcatch)
- [Random Number](#random-number)

## Setup

We need to set a few environment variables for the bot to be able to auth and connect to a Twitch channel. These can be included in a _.env_ file, which will be imported.

`BOT_USERNAME`: Username of the bot's Twitch account

`OAUTH_TOKEN`: OAuth token for authentication

`CHANNEL_NAMES`: String delimited list of Twitch Channels to join

```bash
# Install dependencies
$ npm install

# Serve with nodemon and babel-node for local development
$ npm run dev

# Run webpack build for production
$ npm run build

# Run production app
$ npm run start
```

---

## Throw/Catch

A set of commands to enable throwing and catching of a pre-defined item between chat members. There's no hidden depth here. It's just for fun.

![Throw/Catch example](screenshots/throw-catch.jpg 'Throw/Catch example')

```bash
# To throw an item to be caught
!throw

# To catch the last item that was thrown
!catch

# To throw an item at a chat member
!throw @username
```

### Configuration

Throw/Catch can be configured in `src/config.json`

| Setting | Type     | Description                  |
| ------- | -------- | ---------------------------- |
| `item`  | `string` | Name of the item to be used. |

---

## Battle Royale

An automated take on the popular Battle Royale genre. For a round, current members of chat are the active players. Players will randomly win 1v1 battles against other random players. There is a small chance a player can eliminate themselves. The last player alive is declared the winner.

![Battle Royale example](screenshots/battle-royale.jpg 'Battle Royale example')

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

---

## Random Number

This feature asks the bot to pick a random number. By default it rolls between 1 and 100. If you include a number in the command, it will use that number as the max e.g. `!roll 500`.

![random roll example](screenshots/roll.jpg 'random roll example')

```bash
# To roll between 1 and 100
!roll

# To roll between 1 and x e.g. !roll 500
!roll <positive number>
```
