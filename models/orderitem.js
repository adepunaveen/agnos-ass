const mongoose = require('mongoose');

const orderitemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    size: String,
    quantity:Number
},
{ timestamps: true });

 const orderItem = mongoose.model('orderItem', orderitemSchema);

module.exports = orderitemSchema