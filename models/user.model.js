const userDatabase = require("./user.mongo");

async function saveUser(user) {
  await userDatabase.create({
    ...user,
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
    },
    {
      runValidators: true,
    }
  );
  return result.acknowledged;
};
const getUserByLicenseNumber = async (licenseNumber) =>
  await userDatabase.findOne({ licenseNumber: licenseNumber });

module.exports = {
  updateUserByLicensenumber,
  getUserByLicenseNumber,
  saveUser,
};
