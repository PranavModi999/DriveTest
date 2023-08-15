const express = require("express");

const appointmentController = require("../controllers/appointment.controller");

const appointmentRouter = express.Router();

//render appointment page
appointmentRouter.get("/", appointmentController.renderAppointmentPage);

//appointment all results
appointmentRouter.get("/results", appointmentController.getTestResults);

//appointment individual results
appointmentRouter.get(
  "/results/:userName",
  appointmentController.getIndividualTestResult
);

//returned stored booked slots
appointmentRouter.get("/:selectDate", appointmentController.getBookedSlots);

//add new book slots
appointmentRouter.post("/", appointmentController.postBookedSlots);

//update user with appointment id
appointmentRouter.put("/", appointmentController.putAppointmentIdIntoUser);

module.exports = appointmentRouter;
