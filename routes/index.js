const express = require('express');
const router = express.Router();
const Item = require("../models/modelItem.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  Item.find().then((result) => {
    res.render('index', { title: 'Home' ,items: result});
})
.catch((err) => console.log(err));  
});

router.get("/:id", function(req, res, next) {
  const id = req.params.id;
  Item.findById(id).then((result) => {
    res.render("item" , {
        item: result,
        title: result.name
    })        
})
});

router.get("/:id/update", function(req, res, next) {
  const id = req.params.id;
  Item.findById(id).then((result) => {
    res.render("itemUpdate" , {
        item: result,
        title: result.name
    })        
})
});

router.post("/:id/update", (req, res) => {
  res.send(req.body)
})

module.exports = router;
