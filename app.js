const express = require("express");
const path = require("path");

const g2PageController = require("./controllers/g2_page.controller");
const gPageController = require("./controllers/g_page.controller");
const homeController = require("./controllers/home.controller");
const loginController = require("./controllers/login.controller");

//creating new server instance
const app = express();

//to allow our application to parse json in post methods
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//exposing view folder to allow server to access frotend code
app.use(express.static(path.join(__dirname, "public")));
//changing view engine to ejs
app.set("view engine", "ejs");

//mouting routes
app.use("/", homeController);
//G page route
app.use("/g", gPageController);
//G2 page route
app.use("/g2", g2PageController);
//Login page route
app.use("/login", loginController);

//exporting instance with all routes and middleware mounted onto it
module.exports = { app };
