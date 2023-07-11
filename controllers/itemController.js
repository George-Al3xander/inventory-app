const Item = require("../models/modelItem.js");


const index = (req, res) => {
    Item.find().then((result) => {
        res.send(result)
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


