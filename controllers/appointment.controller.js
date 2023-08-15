const {
  saveSlotsToDatabase,
  getBookedSlotsByDate,
  updateSlotStatus,
} = require("../models/appointment.model");
const { getCategory } = require("../models/category.model");
const {
  updateUserAppointment,
  getcompletedTestResults,
  getUserByUserName,
} = require("../models/user.model");

const renderAppointmentPage = (req, res) => {
  return res.render("appointment", {
    data: getCategory("appointment"),
  });
};

const getBookedSlots = async (req, res) => {
  console.log("Select Date:", req.params.selectDate);
  //TODO: fetch from db above booked slots
  const bookedSlots = await getBookedSlotsByDate(req.params.selectDate);
  return res.status(200).json(bookedSlots);
};

const getTestResults = async (req, res) => {
  const results = await getcompletedTestResults();
  return res.status(200).json(results);
};
const getIndividualTestResult = async (req, res) => {
  const user = await getUserByUserName(req.params.userName);
  return res.status(200).json(user);
};

const postBookedSlots = async (req, res) => {
  console.log("Booked slots:", req.body);
  const result = await saveSlotsToDatabase(req.body);
  console.log("result:" + result);
  if (result === "success") {
    return res.sendStatus(201);
  } else {
    res.sendStatus(500);
  }
  //TODO: store to db above booked slots
};
const putAppointmentIdIntoUser = async (req, res) => {
  console.log("appointment ID:", req.body);
  try {
    await updateUserAppointment(req.body);
    await updateSlotStatus(req.body.appointmentId, false);
  } catch (e) {
    return res.sendStatus(500);
  }
  return res.sendStatus(201);
};
module.exports = {
  putAppointmentIdIntoUser,
  getIndividualTestResult,
  renderAppointmentPage,
  postBookedSlots,
  getBookedSlots,
  getTestResults,
};
