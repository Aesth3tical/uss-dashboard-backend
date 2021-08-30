const mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    uid: { type: String, required: true },
    balance: { type: Number, default: 0, required: true },
    inventory: { type: Array, required: true },
    businesses: { type: Array, required: true },
    econChannelID: { type: String, required: true, default: "default" },
    econMessageID: { type: String, required: true, default: "default" },
    cooldowns: { type: Array, required: true },
    guilds: { type: Array, required: true }
})