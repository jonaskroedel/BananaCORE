const path = require('path');

// Change working directory to 'src' for relative paths in bot and public
process.chdir(path.join(__dirname, 'src'));

// Backup original console.log
const originalConsoleLog = console.log;

// Function to override console.log with prefix
function overrideConsoleLog(prefix) {
    console.log = (...args) => {
        originalConsoleLog(prefix, ...args);
    };
}

// Function to run the public
function startServer() {
    overrideConsoleLog('[server]');
    require('./src/public/server'); // Adjust path as necessary
}

// Function to run the bot
function startBot() {
    overrideConsoleLog('[bot]');
    require('./src/bot'); // Adjust path as necessary
}

startServer();
startBot();

// Restore the original console.log if needed elsewhere
console.log = originalConsoleLog;