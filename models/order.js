const mongoose = require('mongoose');
const OrderItem = require('./orderitem');

const orderSchema = new mongoose.Schema({
    items:[OrderItem],
    totalPrice:Number
    
},
{ timestamps: true });

const Order = mongoose.model('order', orderSchema);

module.exports = Order