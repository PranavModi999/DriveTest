const bcrypt = require("bcrypt");

const userDatabase = require("./user.mongo");

async function saveUser(user) {
  console.log(user);
  await userDatabase.create({
    userName: user.userName,
    password: user.password,
  });
  console.log(`Succesfully stored User ${user.userName}`);
}

const updateUserByLicensenumber = async (data) => {
  const result = await userDatabase.updateOne(
    { licenseNumber: data.licenseNumber },
    {
      $set: {
        car_details: data.car_details,
      },
    },
    {
      runValidators: true,
    }
  );
  return result.acknowledged;
};
const getUserByLicenseNumber = async (licenseNumber) =>
  await userDatabase.findOne({ licenseNumber: licenseNumber });

const verifyUser = async (user) => {
  const dbUser = await userDatabase.findOne({ userName: user.userName });
  console.log(dbUser);
  if (dbUser) {
    const isValid = bcrypt.compareSync(user.password, dbUser.password);
    if (isValid) {
      return {
        status: "login successful",
        userType: dbUser.userType,
      };
    } else {
      return {
        status: "Invalid password or username",
      };
    }
  } else {
    return {
      status: "User Does not exist",
    };
  }
};

module.exports = {
  updateUserByLicensenumber,
  getUserByLicenseNumber,
  verifyUser,
  saveUser,
};
