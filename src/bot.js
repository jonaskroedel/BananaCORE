require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const eventFiles = fs.readdirSync(path.join(__dirname, 'utils', 'events'))
    .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./utils/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login(process.env.DISCORD_BOT_TOKEN);