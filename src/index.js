import "dotenv/config";
import client from "./client";
import MessageHandlerClass from "./messageHandlers";

const MessageHandler = MessageHandlerClass(client);
const handler = new MessageHandler();

// Register event handlers
client.on("message", handler.messageHandler);

// Connect to Twitch
client.connect();
