const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Path to commands.json
const commandsFilePath = path.join(__dirname, 'usercommands', 'commands.json');

// Route to get commands
app.get('/commands', (req, res) => {
    const commands = JSON.parse(fs.readFileSync(commandsFilePath, 'utf8'));
    res.json(commands);
});

// Route to add a command
app.post('/commands', (req, res) => {
    const newCommand = req.body;
    const commands = JSON.parse(fs.readFileSync(commandsFilePath, 'utf8'));
    commands.push(newCommand);
    fs.writeFileSync(commandsFilePath, JSON.stringify(commands, null, 2), 'utf8');
    res.status(201).send('Command added');
});

// Route to remove all commands
app.delete('/commands', (req, res) => {
    fs.writeFileSync(commandsFilePath, JSON.stringify([], null, 2), 'utf8');
    res.send('All commands removed');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
