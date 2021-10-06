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

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

function App() {
  React.useEffect(function () {
    Network.pageChanged(window.location.pathname);
  });

  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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
