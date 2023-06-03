const path = require("path");

const express = require("express");
const ejs = require("ejs");

//importing category model  which returns relevant category data stored in list
let { getCategory } = require("./models/category.model");

//creating new server instance
const app = express();

//exposing view folder to allow server to access frotend code
app.use(express.static(path.join(__dirname, "views")));
//changing view engine to ejs
app.set("view engine", "ejs");

//default route redirecting to dashboard
app.get("/", (req, res) => res.redirect("/dashboard"));

//Dashboard route
app.get("/dashboard", (req, res) => {
  res.render("index", {
    data: getCategory("dashboard"),
  });
});

//G page route
app.get("/g", (req, res) => {
  res.render("index", {
    data: getCategory("g"),
  });
});

//G2 page route
app.get("/g2", (req, res) => {
  res.render("index", {
    data: getCategory("g2"),
  });
});

//Login page route
app.get("/login", (req, res) => {
  res.render("index", {
    data: getCategory("login"),
  });
});

//exporting instance with all routes and middleware mounted onto it
module.exports = { app };
