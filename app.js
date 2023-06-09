const path = require("path");

const express = require("express");
const ejs = require("ejs");

//importing category model  which returns relevant category data stored in list
const { getCategory } = require("./models/category.model");
const { saveUser } = require("./models/user.model");
//creating new server instance
const app = express();

//to allow our application to parse json in post methods
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
//handle post data and store user object
app.post("/g2", async (req, res) => {
  console.log("USER-DATA:", req.body);
  await saveUser(req.body);
  res.status(200).json({
    success: true,
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
