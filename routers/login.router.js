const express = require("express");

const loginPageController = require("../controllers/login.controller");

const loginPageRouter = express.Router();

loginPageRouter.get("/", loginPageController.renderLoginPage);

loginPageRouter.post("/signup", loginPageController.saveNewUserHandler);

loginPageRouter.get(
  "/signup/:userName/:password",
  loginPageController.verifyUserLogin
);

module.exports = loginPageRouter;
