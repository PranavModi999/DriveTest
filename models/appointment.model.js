const appointmentDatabase = require("./appointment.mongo");

async function saveSlotsToDatabase({ date, slots }) {
  for (let slot of slots) {
    await appointmentDatabase.create({
      date: date,
      time: slot,
    });
  }
  return "success";
}

const getBookedSlotsByDate = async (date) => {
  const slots = await appointmentDatabase.find({
    date: date,
  });
  console.log("DB:", slots);
  return slots;
};

module.exports = {
  getBookedSlotsByDate,
  saveSlotsToDatabase,
};
