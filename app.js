const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/day.js");
const { redirect } = require("express/lib/response");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB");
app.get("/", function (req, res) {

  let day = date();
  Item.find({}, function (err, founditem) {
    if (founditem.length === 0) {
      Item.insertMany(defaultitems, function (err) {
        if (err) {
          console.log("SOme oe");
        } else {
          console.log("Server started and databse successfully");
        }
      });
      res.redirect("/");
    } else {
      res.render("first", { kindofday: day, newlistitem: founditem });
    }
  });
});
const Itemschema = {
  name: String,
};
const Item = mongoose.model("Item", Itemschema);

const item1 = new Item({
  name: "Welcone to your to do list",
});
const defaultitems = [item1];

app.post("/", function (req, res) {
  itemname = req.body.newItem;
  const item = new Item({
    name: itemname,
  });
  item.save();
  res.redirect("/");
});

app.post("/delete",function(req,res)
{
  const checkeditem  = req.body.checkbox;
  Item.findByIdAndRemove(checkeditem,function(err)
  {
    if(!err)
    {
      console.log("Item delete Succesfully");
    }
  })
  res.redirect("/");
})
app.listen(3000, function (req, res) {
  console.log("Port 3000 is working ");
});
