const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    ownerId: { type: String, required: true }
});

module.exports = mongoose.model('Guild', guildSchema);
