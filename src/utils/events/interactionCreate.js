module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        // Accessing commands from CommandLoader through CommandHandler
        const command = interaction.client.commandHandler.loader.commands.get(interaction.commandName);

        if (!command) {
            console.log(`No command matching ${interaction.commandName} found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing command: ${error}`);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error executing this command.', ephemeral: true }).catch(console.error);
            } else {
                await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true }).catch(console.error);
            }
        }
    },
};
