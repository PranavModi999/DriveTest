const path = require("path");

const express = require("express");
const ejs = require("ejs");

//importing category model  which returns relevant category data stored in list
const { getCategory } = require("./models/category.model");
const {
  getUserByLicenseNumber,
  updateUserByLicensenumber,
  validateUser,
  saveUser,
} = require("./models/user.model");
//creating new server instance
const app = express();

//to allow our application to parse json in post methods
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//exposing view folder to allow server to access frotend code
app.use(express.static(path.join(__dirname, "public")));
//changing view engine to ejs
app.set("view engine", "ejs");

//default route redirecting to dashboard
app.get("/", (req, res) => res.redirect("/dashboard"));

//Dashboard route
app.get("/dashboard", (req, res) => {
  return res.render("index", {
    data: getCategory("dashboard"),
  });
});

//G page route
app.get("/g", (req, res) => {
  return res.render("g_page", {
    data: getCategory("g"),
  });
});
//G get User Route
app.get("/g/:licenseNumber", async (req, res) => {
  console.log("Get User:", req.params.licenseNumber);
  const user = await getUserByLicenseNumber(req.params.licenseNumber);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send();
  }
});
//G page Put Update user
app.put("/g", (req, res) => {
  console.log(req.body);
  const isSuccess = updateUserByLicensenumber(req.body);
  if (isSuccess) {
    res.status(201).send();
  } else {
    res.status(500).send();
  }
});
//G2 page route
app.get("/g2", (req, res) => {
  return res.render("g2_page", {
    data: getCategory("g2"),
  });
});
//handle post data and store user object
app.post("/g2", async (req, res) => {
  console.log("USER-DATA:", req.body);
  const user = req.body;
  if (validateUser(user)) {
    await saveUser(user);
    return res.status(201).send();
  } else {
    return res.status(400).send();
  }
});
//Login page route
app.get("/login", (req, res) => {
  return res.render("login", {
    data: getCategory("login"),
  });
});

//exporting instance with all routes and middleware mounted onto it
module.exports = { app };
