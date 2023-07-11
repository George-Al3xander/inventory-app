const Category = require("../models/modelCategory.js");

const index = (req, res) => {
    Category.find().then((result) => {
        res.send(result)
    })
    .catch((err) => console.log(err));
}


