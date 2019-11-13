export default client =>
  class MessageHandlerClass {
    constructor() {
      this.messageHandler = (channel, tags, message, self) => {
        if (self) return;

        let msg = message.trim();

        if (msg.toLowerCase() === "!beets") {
          client.say(channel, `@${tags.username}! Non-stop beets!`);
        }
      };
    }
  };
