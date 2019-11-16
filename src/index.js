import "dotenv/config";
import client from "./client";
import messageHandler from "./messageHandlers";

// Register event handlers
client.on("message", messageHandler);

// Connect to Twitch
client.connect();
