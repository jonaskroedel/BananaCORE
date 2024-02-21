module.exports = {
    name: 'guildCreate',
    once: false,
    execute(guild, client) {
        // Your logic for when the bot joins a guild
        console.log(`Joined guild: ${guild.name}`);
    },
};