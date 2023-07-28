const appointmentAlert = document.getElementById("AppointmentAlert");
const appointmentDate = document.getElementById("appointmentDate");
const slotsContainer = document.getElementById("slotsContainer");

const cancelBtn = document.getElementById("cancelBtn");
const bookBtn = document.getElementById("bookBtn");

const slots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 AM",
  "12:30 AM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
];
let selectedButtons = [];
let appointmentSelectedDate;

function createSlotsButton(unavailabeSlots) {
  const unavailableColor = "#C5C6D0";
  const availableColor = "#63C5DA";
  const confirmColor = "#5DBB63";

  slotsContainer.innerHTML = "";
  let html = "";
  for (const slot of slots) {
    if (unavailabeSlots.includes(slot)) {
      html += `<button type="button" class="btn btn-primary border-0 me-2 mb-2" style="background-color:${unavailableColor}" disabled>${slot}</button>`;
    } else {
      html += `<button type="button" class="btn btn-primary border-0 me-2 mb-2 available-button" style="background-color:${availableColor}" >${slot}</button>`;
    }
  }

  slotsContainer.innerHTML = html;

  const availableButtons = document.querySelectorAll(".available-button");

  availableButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.style.backgroundColor = confirmColor;
      if (!selectedButtons.includes(button.innerHTML))
        selectedButtons.push(button.innerHTML);
      console.log(selectedButtons);
    });
  });
}
const getSlotsFromServer = async (date) => {
  const response = await fetch(`/appointment/${encodeURIComponent(date)}`, {
    method: "Get",
  });
  const data = await response.json();
  return data.map((slot) => slot.time);
};

const postNewBookingsToServer = async () => {
  const data = {
    date: appointmentSelectedDate,
    slots: selectedButtons,
  };
  const response = await fetch("/appointment", {
    method: "Post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });

  const appointmentAlertText = appointmentAlert.firstElementChild;
  if (response.ok) {
    createSlotsButton(await getSlotsFromServer(appointmentSelectedDate));
    appointmentAlert.style.display = "block";
    appointmentAlert.classList.remove("alert-danger");
    appointmentAlert.classList.add("alert-success");
    appointmentAlertText.textContent = "Data Updated Successfully!";
  } else {
    appointmentAlert.style.display = "block";
    appointmentAlert.classList.remove("alert-success");
    appointmentAlert.classList.add("alert-danger");
    appointmentAlertText.textContent = "Something went wrong!";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  appointmentDate.addEventListener("change", async () => {
    //TODO: get below array from server
    appointmentSelectedDate = appointmentDate.value;
    const bookedSlots = await getSlotsFromServer(appointmentSelectedDate);
    console.log("slots:", slots);
    createSlotsButton(bookedSlots);
    console.log("appointment date:", appointmentSelectedDate);
  });
  cancelBtn.addEventListener("click", () => {
    selectedButtons = [];
    createSlotsButton(["10:00 AM", "10:30 AM", "01:30 PM"]);
  });
  bookBtn.addEventListener("click", () => {
    console.log("Final Booking", selectedButtons);
    postNewBookingsToServer();
    //TODO: send to server to register
  });
});
