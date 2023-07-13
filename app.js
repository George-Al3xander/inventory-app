const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
require("dotenv").config();
const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/category');


const app = express();
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {app.listen(3000); console.log("connected to db")})
.catch((err) => console.log(err));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.redirect("/catalog")
});

// app.get("/check", (req, res) => {
//   Item.find()
//   .then((result) => {
//     let arr = result
//     for(let dbItem of arr) {
//       Item.updateOne({url: dbItem.url},{$set: {url: dbItem.name.trim().replaceAll(" ", "-").toLowerCase()}}).then(() => {
//         res.send("Good!")
//       }).catch((err) => {
//         console.log(err)
//       }) 
//     }    
//   })
// });



app.use('/catalog', indexRouter);
app.use('/category', categoryRouter);
app.use((req, res) => {
  res.render("404", {
    title: "404"
  })
})




module.exports = app;
