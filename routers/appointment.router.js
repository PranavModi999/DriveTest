const express = require("express");

const appointmentController = require("../controllers/appointment.controller");

const appointmentRouter = express.Router();

//render appointment page
appointmentRouter.get("/", appointmentController.renderAppointmentPage);

//returned stored booked slots
appointmentRouter.get("/:selectDate", appointmentController.getBookedSlots);

//add new book slots
appointmentRouter.post("/", appointmentController.postBookedSlots);

module.exports = appointmentRouter;
