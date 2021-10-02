import GoogleSignupSvg from "../svg/signup/google";
import AppleSignupSvg from "../svg/signup/apple";
import BirdSvg from "../svg/bird";

function LoginScreen() {
  /**
   * FIXME: this content was originally wrapped in
   * <div id="app">
   * Make sure to refactor all occurrences that may be
   * affected by that. (i.e.: css styles), or direct
   * mounts using ReactDOM.render
   */
  return (
    <div id="app">
      <div className="split-columns">
        <div className="splash flex-vertical-center">
          <BirdSvg />
        </div>
        <div className="login flex-vertical-center">
          <BirdSvg />
          <h1>Happening now</h1>
          <h2>Join Twitter today.</h2>
          <div className="single-sign-on">
            <a href="/home.html" className="login-mechanism">
              <GoogleSignupSvg />
              Sign up with Google
            </a>
            <br />
          </div>
          <div className="single-sign-on">
            <a href="/home.html#" className="login-mechanism">
              <AppleSignupSvg />
              Sign up with Apple
            </a>
            <br />
          </div>
          <div className="single-sign-on">
            <a href="/home.html#" className="login-mechanism">
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
            <a href="home.html#" className="blue login-mechanism">
              Sign in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
