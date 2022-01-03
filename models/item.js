const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    size: String
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item