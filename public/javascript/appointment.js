const appointmentDate = document.getElementById("appointmentDate");

const slots = [];
document.addEventListener("DOMContentLoaded", () => {
  appointmentDate.addEventListener("change", () => {
    console.log("appointment date:", appointmentDate.value);
    //TODO: add in api to fetch and query based on date
  });
});
