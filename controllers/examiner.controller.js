const { getCategory } = require("../models/category.model");

const renderExaminerPage = (req, res) => {
  return res.render("examiner", {
    data: getCategory("examiner"),
  });
};

module.exports = { renderExaminerPage };
