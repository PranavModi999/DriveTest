const { default: mongoose } = require("mongoose");
const { getCategory } = require("../models/category.model");
const { validateUser, saveUser } = require("../models/user.model");

const renderG2Page = (req, res) => {
  return res.render("g2_page", {
    data: getCategory("g2"),
  });
};

const saveUserHandler = async (req, res) => {
  console.log("USER-DATA:", req.body);
  const user = req.body;
  try {
    await saveUser(user);
    return res.status(201).send();
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .send({ error: { "Invalid Data": Object.keys(e.errors) } });
    }
    return res.status(500).send();
  }
};

module.exports = { saveUserHandler, renderG2Page };
