const express = require("express");

const gPageController = require("../controllers/g_page.controller");

const gPageRouter = express.Router();

gPageRouter.get("/", gPageController.renderGPage);
//G get User Route
gPageRouter.get("/:licenseNumber", gPageController.getUserInfo);
//G page Put Update user
gPageRouter.put("/", gPageController.updateCarInfo);

module.exports = gPageRouter;
