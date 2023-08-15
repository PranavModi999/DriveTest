const resultAlert = document.getElementById("resultAlert");

const testTypeFilter = document.getElementById("testTypeFilter");
const testTable = document.getElementById("testTable");

const examinerDetailsForm = document.getElementById("examinerDetailsForm");
const detailUserName = document.getElementById("detailUserName");
const detailComment = document.getElementById("detailComment");
const detailTestResult = document.getElementById("detailTestResult");

async function fetchValidUsers(filter) {
  const response = await fetch(`/examiner/${encodeURIComponent(filter)}`, {
    method: "Get",
  });
  return await response.json();
}

async function createDriverTable(entries) {
  testTable.innerHTML = "";
  let html = "";
  let counter = 0;
  for (let entry of entries) {
    if (entry)
      html += ` <tr>
                <td>${++counter}</td>
                <td><a href="/examiner/details/${entry.user.userName}">${
        entry.user.userName
      }</a></td>
                <td>${entry.appointment.time}</td>
                <td>${entry.user.testType}</td>
            </tr>`;
  }
  testTable.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {
  if (testTypeFilter) {
    createDriverTable(await fetchValidUsers("ALL"));
    testTypeFilter.addEventListener("change", async (evt) => {
      evt.preventDefault();
      createDriverTable(await fetchValidUsers(testTypeFilter.value));
    });
  }
  if (examinerDetailsForm)
    examinerDetailsForm.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      const data = {
        userName: detailUserName.value,
        testResult: detailTestResult.checked ? true : false,
        testComment: detailComment.value,
      };
      const response = await fetch("/examiner/details", {
        method: "Put",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Result:", response);

      const resultAlertText = resultAlert.firstElementChild;
      if (response.ok) {
        resultAlert.style.display = "block";
        resultAlert.classList.remove("alert-danger");
        resultAlert.classList.add("alert-success");
        resultAlertText.textContent = "Data Updated Successfully!";
      } else {
        resultAlert.style.display = "block";
        resultAlert.classList.remove("alert-success");
        resultAlert.classList.add("alert-danger");
        resultAlertText.textContent = "Something went wrong!";
      }
    });
});
