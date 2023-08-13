const express = require("express");

const examinerController = require("../controllers/examiner.controller");

const examinerRouter = express.Router();

examinerRouter.get("/", examinerController.renderExaminerPage);

module.exports = examinerRouter;
