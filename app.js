const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListItems: items });
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/", (req, res) => {
  if (req.body.list === "Work List") {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started");
});
