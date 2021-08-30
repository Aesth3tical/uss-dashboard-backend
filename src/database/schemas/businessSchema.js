const mongoose = require('mongoose');

module.exports = mongoose.model('Business', {
    bid: { type: Number, required: true },
    owner: { type: String, required: true },
    lvl: { type: String, required: true },
    name: { type: String, required: true },
    revenue: { type: Number, required: true },
    sales: { type: Number, required: true },
    products: { type: Array, required: true },
    employees: { type: Array, required: true },
    buildings: { type: Array, required: true },
    type: { type: String, required: true }
})