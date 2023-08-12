const express = require("express");
const path = require("path");

const loginPageRouter = require("./routers/login.router");
const g2PageRouter = require("./routers/g2_page.router");
const homePageRouter = require("./routers/home.router");
const gPageRouter = require("./routers/g_page.router");
const appointmentRouter = require("./routers/appointment.router");
const examinerRouter = require("./routers/examiner.router");

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
app.use("/", homePageRouter);
//G page route
app.use("/g", gPageRouter);
//G2 page route
app.use("/g2", g2PageRouter);
//Login page route
app.use("/login", loginPageRouter);
//appointment page route
app.use("/appointment", appointmentRouter);
//examiner page route
app.use("/examiner", examinerRouter);

//exporting instance with all routes and middleware mounted onto it
module.exports = { app };
