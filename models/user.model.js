const userDatabase = require("./user.mongo");

async function saveUser(user) {
  await userDatabase.create({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
  });
  console.log(`Succesfully stored User ${user.firstName}`);
}

module.exports = { saveUser };
