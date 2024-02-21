const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');

class UserCommandHandler {
    constructor() {
        this.commands = new Map();
    }

    loadUserCommands() {
        const commandsPath = path.join(__dirname, 'userCommands.json');
        const commandsData = JSON.parse(fs.readFileSync(commandsPath, 'utf-8'));

        commandsData.forEach(cmd => {
            const command = new SlashCommandBuilder()
                .setName(cmd.name)
                .setDescription(cmd.description)
                // Add options here if needed
                .toJSON();

            this.commands.set(cmd.name, command);
        });

        console.log(`Loaded ${this.commands.size} user commands.`);
    }

    // Method to dynamically register these commands with Discord API
}

module.exports = UserCommandHandler;
