const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Order = require('../models/order')
router.get('/items', async function(req, res) {
    const items = await Item.find();
    res.send(items)
})
  
router.post('/order',async function(req,res){
    try {
        var orderItems = req.body;
        const newOrder = new Order({});
        newOrder.items = orderItems;
        var totalCost = 0;
        for (const orderItem of  newOrder.items) {
            console.log(orderItem)
            totalCost = totalCost + (orderItem.quantity * orderItem.price);
        }
        newOrder.totalPrice = totalCost;
        
        addOfferProduct(newOrder);
        newOrder.totalPrice = newOrder.totalPrice - addDiscount(newOrder);
        await newOrder.save();
        res.send({message:"Order Placed ! Will Confirm Shortly"});
    } catch (err) {
        console.log(err)
        res.status(500).send({message:err})
    }
})
function addDiscount(order){
    console.log("add discount ")
    if(order.totalPrice > 500){
        return order.totalPrice * 0.10;
    }
    return 0;
}

function addOfferProduct(order){
    console.log("add offer  product")
    var orderPrice = order.totalPrice;
    while(orderPrice > 500){
        const offerItem = {
            name: "beverages",
            price: 1,
            size: "medium",
            quantity:1
        };
        order.items.push(offerItem)
        orderPrice = orderPrice - 500;
    }
}


module.exports = router;