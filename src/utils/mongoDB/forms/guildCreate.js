module.exports = {
    name: 'guildCreate',
    once: false,
    execute(guild, client) {
        // Your logic here, for example:
        console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

        // Add guild information to the database
        // ...
    }
};
