const express = require("express");

const g2PageController = require("../controllers/g2_page.controller");

const g2PageRouter = express.Router();

g2PageRouter.get("/", g2PageController.renderG2Page);
//handle post data and store user object
g2PageRouter.post("/", g2PageController.saveUserHandler);

g2PageRouter.get("/:userName", g2PageController.getUserInfoByUserName);

module.exports = g2PageRouter;
