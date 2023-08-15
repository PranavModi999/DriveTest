const express = require("express");

const appointmentController = require("../controllers/appointment.controller");

const appointmentRouter = express.Router();

//render appointment page
appointmentRouter.get("/", appointmentController.renderAppointmentPage);

//appointment results
appointmentRouter.get("/results", appointmentController.getTestResults);

//returned stored booked slots
appointmentRouter.get("/:selectDate", appointmentController.getBookedSlots);

//add new book slots
appointmentRouter.post("/", appointmentController.postBookedSlots);

//update user with appointment id
appointmentRouter.put("/", appointmentController.putAppointmentIdIntoUser);

module.exports = appointmentRouter;
