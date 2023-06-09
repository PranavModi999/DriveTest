const userForm = document.getElementById("userForm");
const userAlert = document.getElementById("userAlert");
const userAlertText = userAlert.firstElementChild;

function showAlert(isSuccess) {
  if (isSuccess) {
    userAlert.style.display = "block";
    userAlert.classList.add("alert-sucess");
    userAlertText.textContent = "Data Saved Successfully!";
  } else {
    userAlert.style.display = "block";
    userAlert.classList.add("alert-danger");
    userAlertText.textContent = "Something went wrong!";
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

  showAlert(response.ok);
  console.log(response.ok, await response.json());
}
userForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const userData = new FormData(userForm);
  // Convert FormData to plain JavaScript object
  const data = {};
  for (const [key, value] of userData.entries()) {
    data[key] = value;
  }
  postUserData(data);
});
