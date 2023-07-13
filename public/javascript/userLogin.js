const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

const signupModal = document.getElementById("signUpModal");
const userAlertSignup = document.getElementById("userAlertSignup");
const userAlertLogin = document.getElementById("userAlertLogin");
const gNavLink = document.getElementById("gNavLink");
const g2NavLink = document.getElementById("g2NavLink");

const logout = document.getElementById("logout");

if (document.cookie.split("=")[1] === "Driver") {
  const name = document.cookie.split("=")[1];
  gNavLink.style.display = "block";
  g2NavLink.style.display = "block";
}
const handleUserLogin = async (evt) => {
  evt.preventDefault();

  const userName = document.getElementById("userNameLogin").value.trim();
  const password = document.getElementById("passwordLogin").value.trim();

  const response = await fetch(
    `/login/signup/${encodeURIComponent(userName)}/${encodeURIComponent(
      password
    )}`,
    {
      method: "Get",
      headers: { "content-type": "application/json" },
    }
  );
  const responseJson = await response.json();
  if (response.ok) {
    // document.cookie = `username:${userName}`;
    userAlertLogin.style.display = "block";
    userAlertLogin.classList.remove("alert-danger");
    userAlertLogin.classList.add("alert-success");
    userAlertLogin.firstChild.textContent = responseJson.status;
    setTimeout(() => location.reload(), 1200);
    return;
  } else {
    userAlertLogin.style.display = "block";
    userAlertLogin.classList.remove("alert-success");
    userAlertLogin.classList.add("alert-danger");
    userAlertLogin.firstChild.textContent = responseJson.status;
  }
};
const handleUserSignup = async (evt) => {
  evt.preventDefault();

  const userName = document.getElementById("userNameSignUp");
  const password = document.getElementById("passwordSignUp");
  const renterPassword = document.getElementById("passwordSignUpRenter");
  const userType = document.getElementById("userTypeSelect");

  if (password.value.trim() !== renterPassword.value.trim()) {
    userAlertSignup.style.display = "block";
    userAlertSignup.classList.remove("alert-success");
    userAlertSignup.classList.add("alert-danger");
    userAlertSignup.firstChild.textContent = "Password Does not match!";
    return;
  } else {
    userAlertSignup.style.display = "none";
    userAlertSignup.classList.remove("alert-success");
    userAlertSignup.classList.add("alert-danger");
    userAlertSignup.firstChild.textContent = "";
  }
  const data = {
    userName: userName.value.trim(),
    password: password.value.trim(),
    userType: userType.value.trim(),
  };
  const response = await fetch("/login/signup", {
    method: "Post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    userAlertSignup.style.display = "block";
    userAlertSignup.classList.remove("alert-danger");
    userAlertSignup.classList.add("alert-success");

    userName.value = "";
    password.value = "";
    renterPassword.value = "";
    
    userAlertSignup.firstChild.textContent = "User Created Successfully!";
  } else {
    userAlertSignup.style.display = "block";
    userAlertSignup.classList.remove("alert-success");
    userAlertSignup.classList.add("alert-danger");
    userAlertSignup.firstChild.textContent = "Something Went wrong!";
  }
};
if (signupForm) {
  signupForm.addEventListener("submit", handleUserSignup);
}
if (loginForm) {
  loginForm.addEventListener("submit", handleUserLogin);
}
if (logout) {
  logout.addEventListener("click", () => {
    console.log("here");
    document.cookie = "userType=;expires=0";
    location.reload();
  });
}
