const express = require("express");

const appointmentController = require("../controllers/appointment.controller");

const appointmentRouter = express.Router();

appointmentRouter.get("/", appointmentController.renderAppointmentPage);

module.exports = appointmentRouter;
