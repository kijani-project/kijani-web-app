const email = "demo@demo.com";
const password = "demo";

function auth() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user === null || user.email !== email || user.password !== password) {
    window.location.replace(window.location.origin + "/log-ind.html")
  }
}

window.addEventListener("load", () => {
  auth();
});

