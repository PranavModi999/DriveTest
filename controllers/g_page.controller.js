const { default: mongoose } = require("mongoose");
const { getCategory } = require("../models/category.model");
const {
  getUserByLicenseNumber,
  updateUserByLicensenumber,
} = require("../models/user.model");

const renderGPage = (req, res) => {
  return res.render("g_page", {
    data: getCategory("g"),
  });
};

const getUserInfo = async (req, res) => {
  console.log("Get User:", req.params.licenseNumber);
  try {
    const user = await getUserByLicenseNumber(req.params.licenseNumber);
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    if (e instanceof mongoose.Error.ValidationError)
      return res
        .status(400)
        .send({ error: { "Invalid Data": Object.keys(e.errors) } });
  }
  return res.status(500).send();
};

const updateCarInfo = async (req, res) => {
  console.log(req.body);
  try {
    await updateUserByLicensenumber(req.body);
    res.status(201).send();
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .send({ error: { "Invalid Data": Object.keys(e.errors) } });
    }
    return res.status(500).send();
  }
};

module.exports = {
  updateCarInfo,
  getUserInfo,
  renderGPage,
};
