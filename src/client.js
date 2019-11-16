import "dotenv/config";
import tmi from "tmi.js";

const channels = process.env.CHANNEL_NAMES.replace(" ", "").split(",");

export default new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: channels
});
