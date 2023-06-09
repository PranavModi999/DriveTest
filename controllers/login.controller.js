const { getCategory } = require("../models/category.model");
const { saveUser, verifyUser } = require("../models/user.model");

const renderLoginPage = (req, res) => {
  return res.render("login", {
    data: getCategory("login"),
  });
};

const saveNewUserHandler = async (req, res) => {
  await saveUser(req.body);
  res.sendStatus(201);
};
const verifyUserLogin = async (req, res) => {
  console.log(req.params);
  const isValid = await verifyUser(req.params);
  if (isValid.status == "login successful") {
    res.cookie("userType", isValid.userType, { maxAge: 60 * 60 * 24 });
    res.status(200).json(isValid);
  } else res.status(401).json(isValid);
};

module.exports = {
  saveNewUserHandler,
  verifyUserLogin,
  renderLoginPage,
};
