import HeadContent from "./head-content";
import GoogleSignupSvg from "../svg/signup/google.svg";
import AppleSignupSvg from "../svg/signup/apple.svg";
import BirdSvg from "../svg/bird.svg";

function LoginScreen() {
  return (
    <div id="app">
      <div class="split-columns">
        <div class="splash flex-vertical-center">
          <BirdSvg />
        </div>
        <div class="login flex-vertical-center">
          <BirdSvg />
          <h1>Happening now</h1>
          <h2>Join Twitter today.</h2>
          <div class="single-sign-on">
            <a href="#" class="login-mechanism">
              <GoogleSignupSvg />
              Sign up with Google
            </a>
            <br />
          </div>
          <div class="single-sign-on">
            <a href="#" class="login-mechanism">
              <AppleSignupSvg />
              Sign up with Apple
            </a>
            <br />
          </div>
          <div class="single-sign-on">
            <a href="#" class="login-mechanism">
              Sign up with phone or email
            </a>
            <br />
          </div>
          <span class="tos">
            By signing up, you agree to the{" "}
            <a class="blue" href="https://twitter.com/tos">
              Terms of Service
            </a>{" "}
            and{" "}
            <a class="blue" href="https://twitter.com/en/privacy">
              Privacy Policy
            </a>
            , including{" "}
            <a
              class="blue"
              href="https://help.twitter.com/rules-and-policies/twitter-cookies"
            >
              Cookie Use.
            </a>
          </span>
          <span class="existing-members">
            Already have an account?
            <a href="#" class="blue login-mechanism">
              Sign in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
