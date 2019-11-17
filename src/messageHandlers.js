import client from './client';
import config from './config.json';
import BattleRoyale from './battleroyale';
import ThrowCatch from './throwcatch';
import getRandomNumber from './randomnumber';
import { stripHash } from './utilities';

const prefix = config.general.commandPrefix;
const throwCatch = new ThrowCatch();

export default function messageHandler(channel, tags, message, self) {
  // We don't want to process our own messages or messages not beginning with '!'
  if (!self || message[0] === `${prefix}`) {
    // Remove hash from channel name
    const channelName = stripHash(channel);
    const isBroadcaster = tags.username === channelName.toLowerCase();

    // Basic sanitation on message
    const msg = message.trim().toLowerCase();

    // Say hello
    if (msg === `${prefix}hi` || msg === `${prefix}hey` || msg === `${prefix}hello`) {
      client.say(channel, `Hi, @${tags.username} :)`);
    }

    // Random number handling
    if (msg.startsWith(`${prefix}roll`)) {
      getRandomNumber(channelName, msg);
    }

    // Throwing and Catching
    if (msg === `${prefix}throw`) {
      throwCatch.throw(channelName, tags.username);
    } else if (/^!throw\s@[a-zA-Z]+$/.test(msg)) {
      throwCatch.throwAtTarget(channelName, tags.username, msg);
    } else if (msg === `${prefix}catch`) {
      throwCatch.catch(channelName, tags.username);
    }

    // Broadcaster only commands
    if (isBroadcaster) {
      // Initiate Battle Royale
      if (msg === `${prefix}br`) {
        new BattleRoyale().init(channelName);
      }
    }
  }
}
