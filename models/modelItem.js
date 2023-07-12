const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Object,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    //url - name.trim().toLowerCase().replace(" ", "-") 
    url: {
        type: String,
        required: true
    }
})

const Item = mongoose.model("Item", itemSchema)
module.exports = Item