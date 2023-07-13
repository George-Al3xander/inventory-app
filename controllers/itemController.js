const Item = require("../models/modelItem.js");
const Category = require("../models/modelCategory.js");

const index = (req, res) => {
    Item.find().then((result) => {
        res.render('index', { title: 'Home' ,items: result});
    })
    .catch((err) => console.log(err)); 
}

const details = (req, res) => {
    const id = req.params.id;
    Item.findById(id).then((result) => {
    res.render("item" , {
        item: result,
        title: result.name
    })        
  })
}

const update_page = (req, res) => {
    const id = req.params.id;
    Item.findById(id).then((result) => {
    Category.find().then((cat_result) => {
        console.log(cat_result)
        res.render("itemUpdate" , {
            item: result,
            title: result.name,
            categories: cat_result
        })
    }).catch((err) => console.log(err))       
  })
}

const update_page_send = (req, res) => {
    let obj = req.body
    obj = {
        name: obj.name.trim(),
        description: obj.description.trim(),
        category: {
            name: obj.category.split("-")[0],
            id: obj.category.split("-")[1]
        },
        price: obj.price,
        stock: obj.stock,
        url: obj.name.trim().replaceAll(" ", "-").toLowerCase()
    }    
    let itemId = req.body.category.split("-")[2];
    Item.findByIdAndUpdate(itemId, obj)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));     
}

const delete_req = (req, res) => {
    const id = req.params.id; 
    Item.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));   
}

const new_item_page = (req, res) => {
    Category.find().then((cat_result) => {
        console.log(cat_result)
        res.render("itemNew" , {            
            title: "New item",
            categories: cat_result
        })
    }).catch((err) => console.log(err))
}

const new_item_page_send = (req, res) => {
    let obj = req.body
    obj = {
        name: obj.name.trim(),
        description: obj.description.trim(),
        category: {
            name: obj.category.split("-")[0],
            id: obj.category.split("-")[1]
        },
        price: obj.price,
        stock: obj.stock,
        url: obj.name.trim().replaceAll(" ", "-").toLowerCase()
    } 
    const newItem = new Item(obj);
    newItem.save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err)); 
}

module.exports = {
    index,
    details,
    update_page,
    update_page_send,
    delete_req,
    new_item_page,
    new_item_page_send
}
