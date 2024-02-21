// src/utils/CommandLoader.js
const fs = require('fs');
const path = require('path');

class CommandLoader {
    constructor() {
        this.commands = new Map();
    }

    loadCommands(commandsPath) {
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(commandsPath, file));
            if (command.data && command.execute) {
                this.commands.set(command.data.name, command);
            }
        }

        console.log(`Loaded ${this.commands.size} commands.`);
    }
}

module.exports = CommandLoader;
