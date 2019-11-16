import client from "./client";
import initBattleRoyale from "./battleroyale";
import ThrowCatchHandler from "./throwcatch";

const throwCatch = new ThrowCatchHandler();

const channelName = process.env.CHANNEL_NAME;

export default function messageHandler(channel, tags, message, self) {
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
    throwCatch.throw(tags.username);
  } else if (/^!throw\s@[a-zA-Z]+$/.test(message)) {
    throwCatch.throwAtTarget(tags.username, message);
  } else if (message === "!catch") {
    throwCatch.catch(tags.username);
  }

  // Broadcaster only commands
  if (isBroadcaster) {
    // Initiate Battle Royale
    if (message === "!br") {
      initBattleRoyale(client, channelName);
    }
  }
}
