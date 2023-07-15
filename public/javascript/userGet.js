const searchForm = document.getElementById("searchForm");
const detailsForm = document.getElementById("detailsForm");
const searchAlert = document.getElementById("searchAlert");

const firstName = document.getElementById("firstNameGpage");
const lastName = document.getElementById("lastNameGpage");
const age = document.getElementById("ageGpage");
const birthDate = document.getElementById("birthDateGpage");
const licenseNumber = document.getElementById("licenseNumberGpage");

const make = document.getElementById("makeGpage");
const model = document.getElementById("modelGpage");
const year = document.getElementById("yearGpage");
const plateNumber = document.getElementById("plateNumberGpage");

async function getUserDataFromServer(licenseNumber) {
  const response = await fetch(
    `/g/${encodeURIComponent(licenseNumber || -1)}`,
    {
      method: "Get",
    }
  );
  const userData = await response.json();
  console.log("UserData:", userData);
  return { response, userData };
}
function UpdateGPage({ response, userData }) {
  if (response.ok && userData && userData.licenseNumber !== "default") {
    searchAlert.style.display = "none";
    detailsForm.style.display = "block";

    firstName.value = userData.firstName;
    lastName.value = userData.lastName;
    age.value = userData.age;
    birthDate.value = userData.birthDate;
    licenseNumber.value = userData.licenseNumber;

    make.value = userData.car_details.make;
    model.value = userData.car_details.model;
    year.value = new Date(userData.car_details.year).getUTCFullYear();
    plateNumber.value = userData.car_details.plateNumber;
  } else {
    searchAlert.style.display = "block";
  }
}
async function updateCarDetails() {
  const data = {
    licenseNumber: licenseNumber.value,
    car_details: {
      make: make.value,
      model: model.value,
      year: year.value,
      plateNumber: plateNumber.value,
    },
  };
  const response = await fetch("/g", {
    method: "Put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  showAlertGet(response.ok);
}
function showAlertGet(isSuccess) {
  const userAlert = document.getElementById("updateAlert");
  const userAlertText = userAlert.firstElementChild;

  if (isSuccess) {
    userAlert.style.display = "block";
    userAlert.classList.remove("alert-danger");
    userAlert.classList.add("alert-success");
    userAlertText.textContent = "Data Updated Successfully!";
  } else {
    userAlert.style.display = "block";
    userAlert.classList.remove("alert-success");
    userAlert.classList.add("alert-danger");
    userAlertText.textContent = "Something Went wrong!";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  if (detailsForm) {
    userName = getUserNameFromCookie();
    const result = await getUserDataFromServerByUserName();
    UpdateGPage(result);

    searchForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const number = document.getElementById("licenseNumber").value;
      const result = getUserDataFromServer(number);
      UpdateGPage(result);
    });
    detailsForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      updateCarDetails();
    });
  }
});
