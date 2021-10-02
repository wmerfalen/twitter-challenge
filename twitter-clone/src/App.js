import logo from "./logo.svg";
import "./App.css";
import "./css/styles.css";
import ChirpExtendedHeavyWebFont from "./fonts/chirp-extended-heavy-web.woff";
import { BrowserRouter, Route, Link } from "react-router-dom";

/** Let's mount the logged out components */
import AutoLoginMiddleware from "./login/login";
/** Load some persistence helpers for keeping Login state */
import LoginTracker from "./storage/login-tracker";
import ComposeTweet from "./editor/compose-tweet";
import LoginScreen from "./login/login-screen";

function App() {
  return (
    <div className="App">
      <LoginScreen />
      <LoginTracker />
    </div>
  );
}

export default App;
