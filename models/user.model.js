const bcrypt = require("bcrypt");

const userDatabase = require("./user.mongo");

async function updateUserByUserName(user) {
  console.log("UPDATE:", user);

  await userDatabase.findOneAndUpdate(
    {
      userName: user.userName,
    },
    {
      ...user,
    }
  );
  console.log(`Succesfully stored User ${user.userName}`);
  return "success";
}
async function saveUser(user) {
  console.log(user);
  const existingUser = await userDatabase.findOne({ userName: user.userName });
  if (existingUser) {
    return {
      status: "Username is already in-use! Try Another username.",
    };
  }
  await userDatabase.create({
    userName: user.userName,
    password: user.password,
    userType: user.userType,
  });
  console.log(`Succesfully stored User ${user.userName}`);
  return "success";
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

const getUserByUserName = async (userName) =>
  await userDatabase.findOne({ userName: userName });

const verifyUser = async (user) => {
  const dbUser = await userDatabase.findOne({ userName: user.userName });
  if (dbUser) {
    const isValid = bcrypt.compareSync(user.password, dbUser.password);
    if (isValid) {
      return {
        status: "login successful",
        userType: dbUser.userType,
        userName: dbUser.userName,
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
  updateUserByUserName,
  getUserByUserName,
  verifyUser,
  saveUser,
};
