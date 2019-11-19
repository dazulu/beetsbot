import client from './client';
import config from './config.json';
import handleRoll from './roll';
import preloadIsolatedFeatures from './helpers/preload';

const prefix = config.general.commandPrefix;

// Features that are unique to each channel e.g. Battle Royale.
const features = preloadIsolatedFeatures();

export default function messageHandler(channel, tags, message, self) {
  // We don't want to process our own messages or messages not beginning with '!'
  if (!self || message[0] === `${prefix}`) {
    // Remove hash from channel name
    const channelName = channel.replace('#', '');
    const isBroadcaster = tags.username === channelName.toLowerCase();

    // Basic sanitation on message
    const msg = message.trim().toLowerCase();

    // Say hello
    if (msg === `${prefix}hi` || msg === `${prefix}hey` || msg === `${prefix}hello`) {
      client.say(channel, `Hi, @${tags.username} :)`);
    }

    // Random number handling
    if (msg.startsWith(`${prefix}roll`)) {
      handleRoll(channelName, msg);
    }

    // // Random winner from out of known chatters
    // if (msg.startsWith(`${prefix}winner`)) {
    //   features[channelName].winner.handleWinner(channelName, msg);
    // }

    // Throwing and Catching
    if (msg.startsWith(`${prefix}throw`)) {
      features[channelName].throwcatch.handleThrow(channelName, tags.username, msg);
    } else if (msg === `${prefix}catch`) {
      features[channelName].throwcatch.handleCatch(channelName, tags.username);
    }

    // Broadcaster only commands
    if (isBroadcaster || tags.username === 'irishbeets') {
      // Initiate Battle Royale
      if (msg === `${prefix}br`) {
        features[channelName].battleroyale.init(channelName);
      }
    }
  }
}
