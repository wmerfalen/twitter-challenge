import GoogleSignupSvg from "../svg/signup/google";
import AppleSignupSvg from "../svg/signup/apple";
import BirdSvg from "../svg/bird";
import LoginState from "../storage/login-state";
import Url from "../url";

function LoginScreen() {
  function login() {
    LoginState().set("logged-in");
    LoginState().setCurrentUser("lmdbkraft");
  }
  return (
    <div id="app">
      <div className="split-columns">
        <div className="splash flex-vertical-center">
          <BirdSvg />
        </div>
        <div className="login flex-vertical-center">
          <BirdSvg className="twitter-logo" />
          <h1>Happening now</h1>
          <h2>Join Twitter today.</h2>
          <div className="single-sign-on">
            <a href={Url("/home")} className="login-mechanism" onClick={login}>
              <GoogleSignupSvg />
              Sign up with Google
            </a>
            <br />
          </div>
          <div className="single-sign-on">
            <a href={Url("/home")} className="login-mechanism" onClick={login}>
              <AppleSignupSvg />
              Sign up with Apple
            </a>
            <br />
          </div>
          <div className="single-sign-on">
            <a href={Url("/home")} className="login-mechanism" onClick={login}>
              Sign up with phone or email
            </a>
            <br />
          </div>
          <span className="tos">
            By signing up, you agree to the{" "}
            <a className="blue" href="https://twitter.com/tos">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="blue" href="https://twitter.com/en/privacy">
              Privacy Policy
            </a>
            , including{" "}
            <a
              className="blue"
              href="https://help.twitter.com/rules-and-policies/twitter-cookies"
            >
              Cookie Use.
            </a>
          </span>
          <span className="existing-members">
            Already have an account?
            <a href={Url("/home")} className="blue login-mechanism" onClick={login}>
              Sign in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
