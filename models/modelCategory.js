const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },   
    //url - name.trim().toLowerCase().replace(" ", "-") 
    url: {
        type: String,
        required: true
    }
})

const Category = mongoose.model("Category", categorySchema)
module.exports = Category