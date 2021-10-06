function LoginState() {
  const LOGIN_STATE = "login-state";
  const CURRENT_USER = "current-user";
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
    currentUser: function () {
      return window.localStorage.getItem(CURRENT_USER);
    },
    setCurrentUser: function (user) {
      return window.localStorage.setItem(CURRENT_USER, user);
    },
  };
}
export default LoginState;
