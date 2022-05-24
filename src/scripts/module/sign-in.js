const submitLogin = document.getElementById("submit-login");

function login() {
  const password = document.getElementById("password");
  const email = document.getElementById("email");

  let user = {
    "email": email.value, "password": password.value
  }

  sessionStorage.setItem("user", JSON.stringify(user));

  window.location.replace(window.location.origin);
}

submitLogin.addEventListener("click", () => {
  login();
});
