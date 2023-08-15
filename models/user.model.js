const bcrypt = require("bcrypt");

const userDatabase = require("./user.mongo");
const appointmentDatabase = require("./appointment.mongo");

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
const updateTestResultsByUserName = async (data) => {
  const result = await userDatabase.findOneAndUpdate(
    {
      userName: data.userName,
    },
    {
      testResult: data.testResult,
      comment: data.testComment,
    }
  );
};

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

const updateUserAppointment = async ({ userName, TestType, appointmentId }) => {
  console.log("Testtype:", TestType);
  const result = await userDatabase.findOneAndUpdate(
    { userName: userName },
    {
      appointmentId: appointmentId,
      testType: TestType,
    }
  );
  console.log("result:", result);
};

const getUsersByAppointment = async () => {
  const usersWithTestType = await userDatabase.find({
    testType: { $ne: "N/A" },
  });

  const userPromises = usersWithTestType.map(async (user) => {
    if (user.appointmentId !== "N/A") {
      const appointment = await appointmentDatabase
        .findById(user.appointmentId)
        .exec();
      return { user, appointment };
    } else {
      return { user, appointment: null };
    }
  });

  return await Promise.all(userPromises);
};

const getcompletedTestResults = async () => {
  const results = await userDatabase.find({
    testResult: { $in: [true, false] },
  });
  console.log("Fetch results:", results);
  return results;
};

module.exports = {
  updateTestResultsByUserName,
  updateUserByLicensenumber,
  getcompletedTestResults,
  getUserByLicenseNumber,
  updateUserAppointment,
  getUsersByAppointment,
  updateUserByUserName,
  getUserByUserName,
  verifyUser,
  saveUser,
};
