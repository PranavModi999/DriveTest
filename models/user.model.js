const userDatabase = require("./user.mongo");

function validateUser(user) {
  if (user.firstName.trim() === "") {
    return false;
  }
  if (user.lastName.trim() === "") {
    return false;
  }
  if (user.age.trim() === "" || isNaN(user.age)) {
    return false;
  }
  if (user.licenseNumber.trim() === "" || isNaN(user.licenseNumber)) {
    return false;
  }
  if (user.birthDate.trim() === "") {
    return false;
  }
  if (user.firstName.trim() === "") {
    return false;
  }
  if (user.car_details.make.trim() === "") {
    return false;
  }
  if (user.car_details.model.trim() === "") {
    return false;
  }
  if (user.car_details.year.trim() === "" || isNaN(user.car_details.year)) {
    return false;
  }
  if (user.car_details.plateNumber.trim() === "") {
    return false;
  }
  return true;
}

async function saveUser(user) {
  await userDatabase.create({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    licenseNumber: user.licenseNumber,
    birthDate: user.birthDate,
    car_details: {
      make: user.car_details.make,
      model: user.car_details.model,
      year: user.car_details.year,
      plateNumber: user.car_details.plateNumber,
    },
  });
  console.log(`Succesfully stored User ${user.firstName}`);
}
const updateUserByLicensenumber = async (data) => {
  const result = await userDatabase.updateOne(
    { licenseNumber: data.licenseNumber },
    {
      $set: {
        car_details: data.car_details,
      },
    }
  );
  return result.acknowledged;
};
const getUserByLicenseNumber = async (licenseNumber) =>
  await userDatabase.findOne({ licenseNumber: licenseNumber });

module.exports = {
  updateUserByLicensenumber,
  getUserByLicenseNumber,
  validateUser,
  saveUser,
};
