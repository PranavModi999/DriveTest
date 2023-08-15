const { getCategory } = require("../models/category.model");
const {
  updateTestResultsByUserName,
  getUsersByAppointment,
  getUserByUserName,
} = require("../models/user.model");

const renderExaminerPage = (req, res) => {
  return res.render("examiner", {
    data: getCategory("examiner"),
  });
};
const renderUserDetailsPage = async (req, res) => {
  const user = await getUserByUserName(req.params.userName);

  const car_year = user.car_details.year.toISOString().split("-")[0];

  return res.render("examiner_details", {
    data: {
      title: "User Details",
      description: "Following is the selected user details:",
      image: "/images/details.jpg",
      user: user,
      car_year: car_year,
    },
  });
};

const getDriveTestAppointments = async (req, res) => {
  const testFilter = req.params.testFilter;
  const entries = await getUsersByAppointment();
  console.log("Pending appointments:", entries, "|| filter:", testFilter);
  const validUsers =
    testFilter === "ALL"
      ? entries
      : entries.map((entry) => {
          if (entry.user.testType === testFilter) return entry;
        });
  return res.status(200).json(validUsers);
};
const updateTestResults = async (req, res) => {
  console.log("Results:", req.body);
  await updateTestResultsByUserName(req.body);
  return res.sendStatus(201);
};

module.exports = {
  getDriveTestAppointments,
  renderUserDetailsPage,
  renderExaminerPage,
  updateTestResults,
};
