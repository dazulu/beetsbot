export default client =>
  class MessageHandlerClass {
    constructor() {
      this.messageHandler = (channel, tags, message, self) => {
        // We don't want to act on our own messages
        if (self) return;

        // Remove white space from user's message
        const msg = message.trim();

        // Respond to a command
        if (msg.toLowerCase() === "!beets") {
          client.say(channel, `@${tags.username}! Non-stop beets!`);
        }
      };
    }
  };
