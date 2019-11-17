import client from './client';
import BattleRoyale from './battleroyale';
import ThrowCatch from './throwcatch';
import { stripHash, randNum } from './utilities';

const throwCatch = new ThrowCatch();

export default function messageHandler(channel, tags, message, self) {
  // We don't want to process our own messages or messages not beginning with '!'
  if (!self || message[0] === '!') {
    // Remove hash from channel name
    const channelName = stripHash(channel);
    const isBroadcaster = tags.username === channelName.toLowerCase();

    // Basic sanitation on message
    const msg = message.trim().toLowerCase();

    // Random num between 1 and 100 else accept value for between 1 and x
    if (msg === '!roll') {
      client.action(channel, `rolls ${randNum(100)}`);
    } else if (/^!roll\s\d+$/.test(msg)) {
      const max = parseInt(msg.split(' ')[1], 10);
      if (max > 0) {
        client.action(channel, `rolls ${randNum(max)}`);
      }
    }

    // Say hello
    if (msg === '!hi' || msg === '!hey' || msg === '!hello') {
      client.say(channel, `Hi, @${tags.username} :)`);
    }

    // Throwing and Catching
    if (msg === '!throw') {
      throwCatch.throw(channelName, tags.username);
    } else if (/^!throw\s@[a-zA-Z]+$/.test(msg)) {
      throwCatch.throwAtTarget(channelName, tags.username, msg);
    } else if (msg === '!catch') {
      throwCatch.catch(channelName, tags.username);
    }

    // Broadcaster only commands
    if (isBroadcaster) {
      // Initiate Battle Royale
      if (msg === '!br') {
        new BattleRoyale().init(channelName);
      }
    }
  }
}
