const testTypeFilter = document.getElementById("testTypeFilter");

document.addEventListener("DOMContentLoaded", async () => {
  if (testTypeFilter)
    testTypeFilter.addEventListener("change", (evt) => {
      evt.preventDefault();
      console.log(testTypeFilter.value);
    });
});
