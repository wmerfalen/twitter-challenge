import Url from "../url";

function AutoLoginMiddleware() {
  const LOGIN_STATE = "login-state";
  for (let link of document.querySelectorAll(".login-mechanism")) {
    link.onclick = function (event) {
      event.preventDefault();
      window.localStorage.setItem(LOGIN_STATE, "logged-in");
      window.location.href = Url("/home");
    };
  }
}
module.exports = AutoLoginMiddleware;
