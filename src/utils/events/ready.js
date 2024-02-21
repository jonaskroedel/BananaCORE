const Guild = require('../mongoDB/Guilds'); // Update the path as necessary
const mongoose = require('mongoose');
const CommandHandler = require('../commandHandler');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        // Initializing CommandHandler and attaching it to the client
        client.commandHandler = new CommandHandler(client);

        // Ensure database connection is established
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log('Connected to the database.');
            })
            .catch(err => {
                console.error('Could not connect to the database.', err);
            });

        const storedGuilds = await Guild.find({});
        const storedGuildIds = new Set(storedGuilds.map(g => g.guildId));

        // Fetch all guilds the bot is currently a part of
        const currentGuilds = client.guilds.cache.map(guild => guild);

        // Remove guilds from the database that the bot is no longer part of
        for (const storedGuild of storedGuilds) {
            if (!client.guilds.cache.has(storedGuild.guildId)) {
                await Guild.deleteOne({ guildId: storedGuild.guildId });
                console.log(`Removed left guild from database: ${storedGuild.guildId}`);
            }
        }

        // Add new guilds to the database
        for (const currentGuild of currentGuilds) {
            if (!storedGuildIds.has(currentGuild.id)) {
                await Guild.create({ guildId: currentGuild.id, ownerId: currentGuild.ownerId });
                console.log(`Added new guild to database: ${currentGuild.id}`);
            }
        }

        console.log('Bot is ready!');
    },
};
