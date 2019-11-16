import client from "../client";
import config from "../config.json";

export default class ThrowCatch {
  constructor() {
    // The person who last threw the item
    this.tosser = "";

    // The item that will be thrown/caught
    this.item = config.throwcatch.item;
  }

  // Throw the item up for somebody to !catch
  throw(channelName, player) {
    this.tosser = player;
    client.say(channelName, `${player} threw ${this.item}`);
  }

  // Throw the item at a specific target
  throwAtTarget(channelName, player, message) {
    const target = message.split("@")[1];
    client.say(channelName, `${player} threw ${this.item} @${target}`);
  }

  // Catches the item, if there was a previous throw
  catch(channelName, player) {
    if (this.tosser) {
      client.say(
        channelName,
        `${player} caught ${this.item} thrown by ${this.tosser}`
      );
      this.tosser = "";
    }
  }
}
