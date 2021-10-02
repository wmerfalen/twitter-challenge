function LoginState() {
  const LOGIN_STATE = "login-state";
  return {
    get: function () {
      return window.localStorage.getItem(LOGIN_STATE);
    },
    set: function (s) {
      window.localStorage.setItem(LOGIN_STATE, s);
    },
    isLoggedIn: function () {
      return window.localStorage.getItem(LOGIN_STATE) === "logged-in";
    },
  };
}
export default LoginState;
