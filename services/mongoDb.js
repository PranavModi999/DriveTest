const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://pranavmodi767:Ashwin123@pranav.hoyptbk.mongodb.net/";

mongoose.connection.once("open", () => {
  console.log("\x1b[32m MongoDb Connection ready...\x1b[0m");
});

mongoose.connection.on("error", (e) => console.log);

const mongoConnect = async () => await mongoose.connect(MONGO_URL);
const mongoDisconnect = async () => await mongoose.disconnect();

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
