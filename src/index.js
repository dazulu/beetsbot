import 'dotenv/config';
import './discord/client';
import client from './client';
import messageHandler from './messageHandlers';

// Register event handlers
client.on('message', messageHandler);

// Connect to Twitch
client.connect();

client.on('connected', () => {
  console.log(`[TWITCH] Connected channels: ${client.getOptions().channels.length}`);
});
