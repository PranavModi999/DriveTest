const { default: mongoose } = require("mongoose");
const { getCategory } = require("../models/category.model");
const { updateUserByUserName } = require("../models/user.model");
const { getUserByUserName } = require("../models/user.model");

const renderG2Page = (req, res) => {
  return res.render("g2_page", {
    data: getCategory("g2"),
  });
};

const saveUserHandler = async (req, res) => {
  console.log("USER-DATA:", req.body);
  const user = req.body;
  try {
    await updateUserByUserName(user);
    return res.status(201).send();
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .send({ error: { "Invalid Data": Object.keys(e.errors) } });
    }
    return res.sendStatus(500);
  }
};

const getUserInfoByUserName = async (req, res) => {
  console.log("Get User:", req.params.userName);
  try {
    const user = await getUserByUserName(req.params.userName);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    if (e instanceof mongoose.Error.ValidationError)
      return res
        .status(400)
        .send({ error: { "Invalid Data": Object.keys(e.errors) } });
  }
  return res.status(500).send();
};

module.exports = { saveUserHandler, renderG2Page, getUserInfoByUserName };
