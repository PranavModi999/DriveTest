const { getCategory } = require("../models/category.model");
const { saveUser, verifyUser } = require("../models/user.model");

const renderLoginPage = (req, res) => {
  return res.render("login", {
    data: getCategory("login"),
  });
};

const saveNewUserHandler = async (req, res) => {
  const result = await saveUser(req.body);
  if (result === "success") {
    res.sendStatus(201);
  } else {
    res.status(409).json(result);
  }
};
const verifyUserLogin = async (req, res) => {
  const isValid = await verifyUser(req.params);
  console.log("Login status", isValid);
  if (isValid.status == "login successful") {
    res.cookie("userType", isValid.userType, { maxAge: 60 * 60 * 24 });
    res.cookie("userName", isValid.userName, {
      maxAge: 60 * 60 * 24,
    });

    res.status(200).json(isValid);
  } else res.status(401).json(isValid);
};

module.exports = {
  saveNewUserHandler,
  verifyUserLogin,
  renderLoginPage,
};
