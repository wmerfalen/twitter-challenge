import React from "react";

/** Assets */
import logo from "./logo.svg";
import "./App.css";
import "./css/styles.css";
import ChirpExtendedHeavyWebFont from "./fonts/chirp-extended-heavy-web.woff";

/** Let's mount the logged out components */
import AutoLoginMiddleware from "./login/login";

/** Load some persistence helpers for keeping Login state */
import LoginTracker from "./storage/login-tracker";
import ComposeTweet from "./editor/compose-tweet";
import LoginScreen from "./login/login-screen";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import Home from "./views/home";
import Network from "./network/";
import Config from "./config/";

function App() {
  React.useEffect(function () {
    Network.pageChanged(window.location.pathname);
  });

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LoginScreen />
          </Route>
          <Route path="/home">
            <Home
              loadingDivId={Config.LOADING_DIV_ID}
              feedId={Config.FEED_ID}
            />
            <LoginTracker />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
