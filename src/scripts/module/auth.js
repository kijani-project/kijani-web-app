const email = "flokk@kijani.com";
const password = "flokk";

function auth() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user === null || user.email !== email || user.password !== password) {
    window.location.replace(window.location.origin + "/log-ind.html")
  }
}

window.addEventListener("load", () => {
  auth();
});
