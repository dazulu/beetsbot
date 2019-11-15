import initBattleRoyale from "./battleroyale";

export default client =>
  class MessageHandlerClass {
    constructor() {
      this.messageHandler = async (channel, tags, message, self) => {
        // We don't want to process our own messages
        // or messages not beginning with '!'
        if (self || message[0] !== "!") return false;

        const channelName = channel.split("#")[1];
        const isBroadcaster =
          tags.username === process.env.CHANNEL_NAME.toLowerCase();

        // Basic sanitation on message
        message = message.trim().toLowerCase();

        // Respond to a command
        if (message === "!hi") {
          client.say(channel, `@${tags.username}, feel the beet!`);
        }

        // Broadcaster only commands
        if (isBroadcaster) {
          if (message === "!br") {
            initBattleRoyale(client, channelName);
          }
        }
      };
    }
  };
