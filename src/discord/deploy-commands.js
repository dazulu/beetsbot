/**
 * Registers Discord bot commands
 * This script should only be executed when you add new commands or edit existing commands
 */

require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

if (
  !process.env.DISCORD_GUILD_ID ||
  !process.env.DISCORD_BOT_CLIENT_ID ||
  !process.env.DISCORD_BOT_TOKEN
) {
  throw new Error('[DISCORD] Missing token(s)');
}

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!')
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_BOT_CLIENT_ID,
      process.env.DISCORD_GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log('[DISCORD] Successfully registered commands'))
  .catch(console.error);
