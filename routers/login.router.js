const express = require("express");

const loginPageController = require("../controllers/login.controller");

const loginPageRouter = express.Router();

loginPageRouter.get("/", loginPageController.renderLoginPage);

module.exports = loginPageRouter;
