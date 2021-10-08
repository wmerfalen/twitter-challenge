import React from "react";

/** Assets */
import "./App.css";
import "./css/styles.css";

/** Load some persistence helpers for keeping Login state */
import LoginTracker from "./storage/login-tracker";
import LoginScreen from "./login/login-screen";

import {
  BrowserRouter as Router,
  Switch,
  Route,
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
