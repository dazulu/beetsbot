import client from '../client';
import config from '../config.json';

const prefix = config.general.commandPrefix;

export default class ThrowCatch {
  constructor() {
    // The person who last threw the item
    this.tosser = '';

    // The item that will be thrown/caught
    this.item = config.throwcatch.item;
  }

  handleThrow(channelName, username, msg) {
    // pattern to test if throw is directed at somebody
    const regex = new RegExp(`^\\${prefix}throw\\s@[a-zA-Z]+$`, 'i');
    if (msg === `${prefix}throw`) {
      this.throw(channelName, username);
    } else if (regex.test(msg)) {
      this.throwAtTarget(channelName, username, msg);
    }
  }

  // Throw the item up for somebody to !catch
  throw(channelName, player) {
    this.tosser = player;
    client.say(channelName, `${player} threw ${this.item}`);
  }

  // Throw the item at a specific target
  throwAtTarget(channelName, player, message) {
    const target = message.split('@')[1];
    client.say(channelName, `${player} threw ${this.item} @${target}`);
  }

  // Catches the item, if there was a previous throw
  handleCatch(channelName, player) {
    if (this.tosser) {
      if (this.tosser === player) {
        // items are defined with their indefinite articles and possessive pronouns
        // we are removing them here due to different sentence structure
        client.say(
          channelName,
          `${player} caught their own ${this.item
            .split(' ')
            .slice(1)
            .join(' ')}`
        );
      } else {
        client.say(channelName, `${player} caught ${this.item} thrown by ${this.tosser}`);
      }
    }

    this.tosser = '';
  }
}
