export default (client) => class MessageHandlerClass {
  messageHandler(channel, tags, message,  self) {
    if (self) return
    
    const msg = message.trim()
  
    if (msg.toLowerCase() === '!beets') {
      client.say(channel, `@${tags.username}, non-stop beets!`)
    }
  }
}