const express = require("express");

const examinerController = require("../controllers/examiner.controller");

const examinerRouter = express.Router();

examinerRouter.get("/", examinerController.renderExaminerPage);

examinerRouter.get(
  "/details/:userName",
  examinerController.renderUserDetailsPage
);
examinerRouter.put("/details", examinerController.updateTestResults);

examinerRouter.get("/:testFilter", examinerController.getDriveTestAppointments);

module.exports = examinerRouter;
