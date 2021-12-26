import 'dotenv/config';
import tmi from 'tmi.js';

if (!process.env.BOT_USERNAME || !process.env.OAUTH_TOKEN) {
  throw new Error('[TWITCH] Missing auth tokens');
}

const channels = process.env.CHANNEL_NAMES.replace(' ', '').split(',');

export default new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels
});
