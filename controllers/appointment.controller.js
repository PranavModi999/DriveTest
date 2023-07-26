const { getCategory } = require("../models/category.model");

const renderAppointmentPage = (req, res) => {
  return res.render("appointment", {
    data: getCategory("appointment"),
  });
};

module.exports={
    renderAppointmentPage
}