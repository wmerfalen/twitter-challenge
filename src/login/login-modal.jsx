import LoginPromptSvg from "../svg/login-prompt";
import Url from "../url";

const POPUP_ID = "tweet-login-popup";
const MODAL_WRAPPER_ID = "login-modal-wrapper";
function LoginPrompter({ wrapperId }) {
  function dismiss() {
    document.getElementById(MODAL_WRAPPER_ID).remove();
  }
  function gotoLogin() {
    window.location.href = Url("/");
  }
  return (
    <div className="login-popup">
      <h4 onClick={dismiss}>X</h4>
      <div className="heart">
        <LoginPromptSvg />
      </div>
      <div className="cta">
        <h3>Like a tweet to share the love</h3>
        <p>
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
