const express = require("express");

const g2PageController = require("../controllers/g2_page.controller");

const g2PageRouter = express.Router();

g2PageRouter.get("/", g2PageController.renderG2Page);
//handle post data and store user object
g2PageRouter.post("/", g2PageController.saveUserHandler);

module.exports = g2PageRouter;
