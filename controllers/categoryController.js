const Item = require("../models/modelItem.js");
const Category = require("../models/modelCategory.js");

const index = (req, res) => {
    Category.find().then((result) => {
        res.render("categories", {
            title: "Categories",
            items: result
        })
        
    })
    .catch((err) => console.log(err));
}

const details = (req, res) => {
    const id = req.params.id;
    Category.findById(id).then((result) => {
    Item.find().then((items) => {
        items = items.filter((item) => {
            return item.category.name.toLowerCase() == result.name.toLowerCase()
        })        
        res.render("category" , {
            item: result,
            title: result.name,
            items
        }) 
    }).catch((err) => console.log(err))
  })
}

const update_page = (req, res) => {
    const id = req.params.id;
    Category.findById(id).then((result) => {
        res.render("categoryUpdate" , {
            item: result,
            title: result.name           
    }); 
    }).catch((err) => console.log(err))       
    
}

const update_page_send = (req, res) => {
    const id = req.params.id;            
        let obj = req.body
    obj = {
        name: obj.name.trim().toLowerCase(),
        description: obj.description.trim(),        
        url: obj.name.trim().replaceAll(" ", "-").toLowerCase()
    }   
    Category.findByIdAndUpdate(id, obj)
    .then(() => {
        Item.find(
            { category:  {
                id: {$eq: id}}
            } 
                
            // ,
            // {$set: {
            //     category: {
            //         name: obj.name.trim().toLowerCase(),
            //         id: id
            //     }
            // }}
        )
        .then((sth) => console.log(sth))
        .then(() => res.redirect("/")).catch((err) => console.log(err)); 
    })      
       
}

const delete_req = (req, res) => {
    const id = req.params.id; 
    Item.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));   
}

module.exports = {
    index,
    details,
    update_page,
    update_page_send,
    delete_req
}


