const appointmentAlert = document.getElementById("AppointmentAlert");
const appointmentDate = document.getElementById("appointmentDate");
const slotsContainer = document.getElementById("slotsContainer");
const bookSelect = document.getElementById("bookSelect");
const bookAlert = document.getElementById("bookAlert");
const bookDate = document.getElementById("dateBook");

const cancelBtn = document.getElementById("cancelBtn");
const bookG2Btn = document.getElementById("bookG2Btn");
const bookGBtn = document.getElementById("bookGBtn");
const bookBtn = document.getElementById("bookBtn");

const testResultTable = document.getElementById("testResultTable");

const g2ResultContainer = document.getElementById("g2ResultContainer");
const g2TestStatus = document.getElementById("g2TestStatus");
const g2Resultbody = document.getElementById("g2Resultbody");
const g2ResultUserName = document.getElementById("g2ResultUserName");
const g2ResultTestType = document.getElementById("g2ResultTestType");
const g2ResultTestResult = document.getElementById("g2ResultTestResult");
const g2ResultTestComment = document.getElementById("g2ResultTestComment");

const gResultContainer = document.getElementById("gResultContainer");
const gTestStatus = document.getElementById("gTestStatus");
const gResultbody = document.getElementById("gResultbody");
const gResultUserName = document.getElementById("gResultUserName");
const gResultTestType = document.getElementById("gResultTestType");
const gResultTestResult = document.getElementById("gResultTestResult");
const gResultTestComment = document.getElementById("gResultTestComment");

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
let availableSlots = [];
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
  console.log("Appointments:", data);
  availableSlots = data;
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
    appointmentAlertText.textContent = "Appointments booked Successfully!";
  } else {
    appointmentAlert.style.display = "block";
    appointmentAlert.classList.remove("alert-success");
    appointmentAlert.classList.add("alert-danger");
    appointmentAlertText.textContent = "Something went wrong!";
  }
};

const createSlotsSelect = () => {
  bookSelect.innerHTML = "";
  let html = "";
  availableSlots.forEach((slot) => {
    if (slot.isTimeSlotAvailable)
      html += `<option value="${slot._id}" selected>${slot.time}</option>`;
  });
  bookSelect.innerHTML = html;
};

const postUserAppointmentId = async (id, testType) => {
  const data = {
    userName: getUserNameFromCookie(),
    TestType: testType,
    appointmentId: id,
  };
  console.log("apponintment data:", data);
  const response = await fetch(`/appointment`, {
    method: "Put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const bookAlertText = bookAlert.firstElementChild;

  if (response.ok) {
    bookAlert.style.display = "block";
    bookAlert.classList.remove("alert-danger");
    bookAlert.classList.add("alert-success");
    bookAlertText.textContent = "Appointment booked Successfully!";
  } else {
    bookAlert.style.display = "block";
    bookAlert.classList.remove("alert-success");
    bookAlert.classList.add("alert-danger");
    bookAlertText.textContent = "Something went wrong!";
  }
};

const createTestTable = (users) => {
  console.log(users);
  testResultTable.innerHTML = "";
  let html = "";
  for (let i = 1; i <= users.length; i++) {
    const user = users[i - 1];
    html += `<tr>
              <td>${i}</td>
              <td>${user.userName}</td>
              <td>${user.car_details.make}</td>
              <td>${user.car_details.model}</td>
              <td>${user.testType}</td>
              <td class="text-${
                user.testResult === true ? "success" : "danger"
              } bold"><strong>${
      user.testResult == true ? "Passed" : "Failed"
    }</strong></td>
            </tr>`;
  }
  testResultTable.innerHTML = html;
};
async function testResultHandler(type) {
  if (g2ResultContainer) {
    const response = await fetch(
      `/appointment/results/${encodeURIComponent(getUserNameFromCookie())}`,
      { method: "Get" }
    );
    const responseJson = await response.json();
    if (response.ok && responseJson.testType.toUpperCase() == "G2") {
      console.log("G2 Result:", responseJson);
      if (
        // false
        responseJson.testResult === true ||
        responseJson.testResult === false
      ) {
        g2ResultContainer.style.display = "block";
        g2Resultbody.style.display = "block";
        g2TestStatus.classList.remove("text-warning");
        g2TestStatus.classList.add("text-success");
        g2TestStatus.firstElementChild.textContent = "COMPLETE";

        g2ResultUserName.textContent = responseJson.userName;
        g2ResultTestType.textContent = responseJson.testType;
        g2ResultTestResult.textContent =
          responseJson.testResult === true ? "Passed" : "Failed";
        if (responseJson.testResult === true) {
          g2ResultTestResult.classList.remove("text-danger");
          g2ResultTestResult.classList.add("text-success");
        } else {
          g2ResultTestResult.classList.remove("text-success");
          g2ResultTestResult.classList.add("text-danger");
        }
        g2ResultTestComment.textContent = responseJson.comment;
      } else {
        g2ResultContainer.style.display = "block";
        g2Resultbody.style.display = "none";
        g2TestStatus.classList.remove("text-success");
        g2TestStatus.classList.add("text-warning");
        g2TestStatus.firstElementChild.textContent = "PENDING";
      }
    } else {
      console.log("Not G2 user");
    }
  }
  if (gResultContainer) {
    const response = await fetch(
      `/appointment/results/${encodeURIComponent(getUserNameFromCookie())}`,
      { method: "Get" }
    );
    const responseJson = await response.json();
    if (response.ok && responseJson.testType.toUpperCase() == "G") {
      console.log("G Result:", responseJson);
      if (
        // false
        responseJson.testResult === true ||
        responseJson.testResult === false
      ) {
        gResultContainer.style.display = "block";
        gResultbody.style.display = "block";
        gTestStatus.classList.remove("text-warning");
        gTestStatus.classList.add("text-success");
        gTestStatus.firstElementChild.textContent = "COMPLETE";

        gResultUserName.textContent = responseJson.userName;
        gResultTestType.textContent = responseJson.testType;
        gResultTestResult.textContent =
          responseJson.testResult === true ? "Passed" : "Failed";
        if (responseJson.testResult === true) {
          gResultTestResult.classList.remove("text-danger");
          gResultTestResult.classList.add("text-success");
        } else {
          gResultTestResult.classList.remove("text-success");
          gResultTestResult.classList.add("text-danger");
        }
        gResultTestComment.textContent = responseJson.comment;
      } else {
        gResultContainer.style.display = "block";
        gResultbody.style.display = "none";
        gTestStatus.classList.remove("text-success");
        gTestStatus.classList.add("text-warning");
        gTestStatus.firstElementChild.textContent = "PENDING";
      }
    } else {
      console.log("Not G user");
    }
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  testResultHandler();

  if (testResultTable) {
    const response = await fetch("/appointment/results", { method: "Get" });
    createTestTable(await response.json());
  }
  if (bookDate)
    bookDate.addEventListener("change", async () => {
      bookSelectedDate = bookDate.value;
      const bookSlots = await getSlotsFromServer(bookSelectedDate);
      createSlotsSelect();
    });
  if (bookSelect)
    bookSelect.addEventListener("change", () => {
      console.log("Select Change:", bookSelect.value);
    });
  if (appointmentDate)
    appointmentDate.addEventListener("change", async () => {
      //TODO: get below array from server
      appointmentSelectedDate = appointmentDate.value;
      selectedButtons = [];
      const bookedSlots = await getSlotsFromServer(appointmentSelectedDate);
      createSlotsButton(bookedSlots);
      console.log("appointment date:", appointmentSelectedDate);
    });
  if (cancelBtn)
    cancelBtn.addEventListener("click", async () => {
      selectedButtons = [];
      const bookedSlots = await getSlotsFromServer(appointmentSelectedDate);
      createSlotsButton(bookedSlots);
    });
  if (bookG2Btn)
    bookG2Btn.addEventListener("click", () =>
      postUserAppointmentId(bookSelect.value, "G2")
    );
  if (bookGBtn)
    bookGBtn.addEventListener("click", () =>
      postUserAppointmentId(bookSelect.value, "G")
    );
  if (bookBtn)
    bookBtn.addEventListener("click", () => {
      console.log("Final Booking", selectedButtons);
      postNewBookingsToServer();
      //TODO: send to server to register
    });
});
