const userForm = document.getElementById("userForm");

const g2firstName = document.getElementById("firstName");
const g2lastName = document.getElementById("lastName");
const g2age = document.getElementById("age");
const g2licenseNumber = document.getElementById("licenseNumber");
const g2birthDate = document.getElementById("birthDate");

const g2make = document.getElementById("make");
const g2model = document.getElementById("model");
const g2year = document.getElementById("year");
const g2plateNumber = document.getElementById("plateNumber");

let userName = "";
if (userForm) {
}
function showAlertPost(isSuccess) {
  const userAlert = document.getElementById("userAlert");
  const userAlertText = userAlert.firstElementChild;

  if (isSuccess) {
    userAlert.style.display = "block";
    userAlert.classList.remove("alert-danger");
    userAlert.classList.add("alert-success");
    userAlertText.textContent = "Data Saved Successfully!";
  } else {
    userAlert.style.display = "block";
    userAlert.classList.remove("alert-success");
    userAlert.classList.add("alert-danger");
    userAlertText.textContent = "Please enter valid data!";
  }
}

async function postUserData() {
  const data = getUserDataFromForm();
  console.log(data);
  const response = await fetch("/g2", {
    method: "Post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  showAlertPost(response.ok);
  // console.log(response.ok, await response.json());
}
function getUserDataFromForm() {
  const car_details = {
    make: g2make.value,
    model: g2model.value,
    year: g2year.value,
    plateNumber: g2plateNumber.value,
  };

  return {
    userName: userName,
    firstName: g2firstName.value,
    lastName: g2lastName.value,
    age: g2age.value,
    licenseNumber: g2licenseNumber.value,
    birthDate: g2birthDate.value,
    car_details: car_details,
  };
}
function getUserNameFromCookie() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [name, value] = cookie.split("=");

    if (name === "userName") {
      return value;
    }
  }
}
async function getUserDataFromServerByUserName() {
  const response = await fetch(`/g2/${encodeURIComponent(userName || -1)}`, {
    method: "Get",
  });
  const userData = await response.json();
  console.log("UserData:", userData);
  return { response, userData };
}
function UpdateG2Page({ response, userData }) {
  if (response.ok && userData && userData.licenseNumber != "default") {
    g2firstName.value = userData.firstName;
    g2lastName.value = userData.lastName;
    g2age.value = userData.age;
    g2birthDate.value = userData.birthDate;
    g2licenseNumber.value = userData.licenseNumber;

    g2make.value = userData.car_details.make;
    g2model.value = userData.car_details.model;
    g2year.value = new Date(userData.car_details.year).getUTCFullYear();
    g2plateNumber.value = userData.car_details.plateNumber;
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  if (userForm) {
    userName = getUserNameFromCookie();
    const result = await getUserDataFromServerByUserName();
    UpdateG2Page(result);

    console.log(result);
    userForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      postUserData();
    });
  }
});
