const { Client, Intents } = require('discord.js');

if (!process.env.DISCORD_BOT_TOKEN) {
  throw new Error('[DISCORD] Missing bot token');
}

export const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`[DISCORD] Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
