import client from "./client";
import BattleRoyale from "./battleroyale";
import ThrowCatch from "./throwcatch";
import { stripHash, randNum } from "./utilities.js";

const throwCatch = new ThrowCatch();

export default function messageHandler(channel, tags, message, self) {
  // We don't want to process our own messages
  // or messages not beginning with '!'
  if (self || message[0] !== "!") return false;

  // Remove hash from channel name
  const channelName = stripHash(channel);
  const isBroadcaster = tags.username === channelName.toLowerCase();

  // Basic sanitation on message
  message = message.trim().toLowerCase();

  // Random num between 1 and 100 else accept value for between 1 and x
  if (message === "!roll") {
    client.action(channel, `rolls ${randNum(100)}`);
  } else if (/^!roll\s\d+$/.test(message)) {
    const max = parseInt(message.split(" ")[1]);
    if (max > 0) {
      client.action(channel, `rolls ${randNum(max)}`);
    }
  }

  // Say hello
  if (message === "!hi" || message === "!hey" || message === "!hello") {
    client.say(channel, `Hi, @${tags.username} :)`);
  }

  // Throwing and Catching
  if (message === "!throw") {
    throwCatch.throw(channelName, tags.username);
  } else if (/^!throw\s@[a-zA-Z]+$/.test(message)) {
    throwCatch.throwAtTarget(channelName, tags.username, message);
  } else if (message === "!catch") {
    throwCatch.catch(channelName, tags.username);
  }

  // Broadcaster only commands
  if (isBroadcaster) {
    // Initiate Battle Royale
    if (message === "!br") {
      new BattleRoyale().init(channelName);
    }
  }
}
