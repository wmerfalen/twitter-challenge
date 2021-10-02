import logo from "./logo.svg";
import "./App.css";
import "./css/styles.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

/** Let's mount the logged out components */
import AutoLoginMiddleware from "./login/login";
/** Load some persistence helpers for keeping Login state */
import LoginTracker from "./storage/login-tracker";
import ComposeTweet from "./editor/compose-tweet";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <LoginTracker />
    </div>
  );
}

export default App;
