const { getCategory } = require("../models/category.model");

const renderLoginPage = (req, res) => {
  return res.render("login", {
    data: getCategory("login"),
  });
};

module.exports = {
  renderLoginPage,
};
