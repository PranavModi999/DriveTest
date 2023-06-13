const userForm = document.getElementById("userForm");

if (userForm) {
}
function showAlert(isSuccess) {
  const userAlert = document.getElementById("userAlert");
  const userAlertText = userAlert.firstElementChild;

  if (isSuccess) {
    userAlert.style.display = "block";
    userAlert.classList.add("alert-sucess");
    userAlertText.textContent = "Data Saved Successfully!";
  } else {
    userAlert.style.display = "block";
    userAlert.classList.add("alert-danger");
    userAlertText.textContent = "Please enter valid data!";
  }
}

async function postUserData(data) {
  const response = await fetch("/g2", {
    method: "Post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("here");
  showAlert(response.ok);
  console.log(response.ok, await response.json());
}
function getUserData() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const licenseNumber = document.getElementById("licenseNumber").value;
  const birthDate = document.getElementById("birthDate").value;

  const make = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const plateNumber = document.getElementById("plateNumber").value;

  const car_details = {
    make: make,
    model: model,
    year: year,
    plateNumber: plateNumber,
  };

  return {
    firstName: firstName,
    lastName: lastName,
    age: age,
    licenseNumber: licenseNumber,
    birthDate: birthDate,
    car_details: car_details,
  };
}

if (userForm) {
  userForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data = getUserData();

    console.log(data);
    postUserData(data);
  });
}
