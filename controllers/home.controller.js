const { getCategory } = require("../models/category.model");

const redirectToDashBoard = (req, res) => {
  return res.redirect("/dashboard");
};

const renderDashboard = (req, res) => {
  return res.render("index", {
    data: getCategory("dashboard"),
  });
};
module.exports = { redirectToDashBoard, renderDashboard };
