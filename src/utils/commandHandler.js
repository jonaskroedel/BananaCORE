const CommandLoader = require('./CommandLoader');
const path = require('path');

class CommandHandler {
    constructor(client) {
        this.client = client;
        this.loader = new CommandLoader();

        // Adjust the path as necessary
        const commandsPath = path.join(__dirname, '..', 'commands');
        this.loader.loadCommands(commandsPath);

        console.log('Commands loaded');
    }

    handleCommand(interaction) {
        const command = this.loader.commands.get(interaction.commandName);
        if (!command) return;

        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error executing this command!', ephemeral: true }).catch(console.error);
        }
    }
}

module.exports = CommandHandler;
