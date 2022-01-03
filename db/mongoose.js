const mongoose = require('mongoose');
const Item = require('../models/item')
const itemData = require('../db-init/items.json')
mongoose.connect('mongodb://localhost:27017/agnosdb', 
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

async function loadData(){
    await Item.deleteMany({});
    itemData.forEach(element => {
        const newItem = new Item(element)
        newItem.save();
    });

}
loadData()