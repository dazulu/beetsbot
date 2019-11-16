import client from "./client";
import initBattleRoyale from "./battleroyale";
import ThrowCatchHandler from "./throwcatch";
import { stripHash } from "./utilities.js";

const throwCatch = new ThrowCatchHandler();

export default function messageHandler(channel, tags, message, self) {
  // Remove hash from channel name
  const channelName = stripHash(channel);

  // We don't want to process our own messages
  // or messages not beginning with '!'
  if (self || message[0] !== "!") return false;

  const isBroadcaster = tags.username === channelName.toLowerCase();

  // Basic sanitation on message
  message = message.trim().toLowerCase();

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
      initBattleRoyale(client, channelName);
    }
  }
}
