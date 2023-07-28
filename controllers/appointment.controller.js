const {
  saveSlotsToDatabase,
  getBookedSlotsByDate,
} = require("../models/appointment.model");
const { getCategory } = require("../models/category.model");

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

module.exports = {
  renderAppointmentPage,
  postBookedSlots,
  getBookedSlots,
};
