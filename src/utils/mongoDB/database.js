const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Could not connect to the database.', error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;