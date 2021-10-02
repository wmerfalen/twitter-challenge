import { React } from "react";

import LoginPromptSvg from "../svg/login-prompt.svg";

const POPUP_ID = "tweet-login-popup";
//const BACKDROP_ID = "tweet-login-backdrop";
const MODAL_WRAPPER_ID = "login-modal-wrapper";
function LoginPrompter({ wrapperId }) {
  function dismiss() {
    document.getElementById(MODAL_WRAPPER_ID).remove();
  }
  function gotoLogin() {
    window.location.href = "/clones/index.html";
  }
  return (
    <div className="login-popup">
      <h1 onClick={dismiss}>X</h1>
      <div className="heart">
        <LoginPromptSvg />
      </div>
      <div className="login-cta">
        <h3>Like a tweet to share the love</h3>
        <p className="cta">
          Join Twitter now to let William Merfalen know you like their Tweet.
        </p>
      </div>
      <div className="login-wrapper">
        <div className="container">
          <button className="login" onClick={gotoLogin}>
            Log in
          </button>
        </div>
        <div className="container">
          <button className="sign-up" onClick={gotoLogin}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
function LoginModal() {
  return (
    <div>
      <LoginPrompter wrapperId={POPUP_ID} />
    </div>
  );
}
export default LoginModal;
