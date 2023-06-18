const express = require("express");

const homePageController = require("../controllers/home.controller");

const homePageRouter = express.Router();
//default route redirecting to dashboard
homePageRouter.get("/", homePageController.redirectToDashBoard);

//Dashboard route
homePageRouter.get("/dashboard", homePageController.renderDashboard);

module.exports = homePageRouter;
