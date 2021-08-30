const mongoose = require('mongoose');

module.exports = mongoose.model('Guild', {
    gid: { type: String, required: true },
    prefix: { type: String, default: "." },
    modlogs: { type: String, required: false },
    customs: { type: Array, required: true },
    items: { type: Array },
    business_types: { type: Array },
    workResponses: { type: Array, required: true },
    crimeResponses: { type: Array, required: true },
    freelanceResponses: { type: Array, required: true },
    newsChannels: { type: Array, required: true },
    welcome: { type: String }
})