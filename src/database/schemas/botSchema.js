const mongoose = require('mongoose');

module.exports = mongoose.model('Bot', {
    i: { type: Boolean, required: true },
    items: { type: Array, required: true },
    admins: { type: Array, required: true }
})