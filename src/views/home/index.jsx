import { React, ReactDOM } from "react";
import "../../css/home.css";
import ChirpExtendedHeavyWebFont from "../../fonts/chirp-extended-heavy-web.woff";
import TweetVisibility from "../../tweet/tweet-visibility";
import LeftNav from "../../navigation/left-nav";

import Tweet from "../../tweet/tweet";
import ComposeTweet from "../../editor/compose-tweet";
import IdProvider from "../../providers/id/id-provider";
import Config from "../../config/";

function Home({ loadingDivId, feedId }) {
  const ASSETS = Config.ASSETS_BASE_URL;
  return (
    <div id="home-app">
      <div className="main-content">
        <div className="left-padding"></div>
        <div className="left-nav column" id="left-nav">
          <LeftNav />
        </div>
        <div id="center-column" className="center-column column">
          <div id="home">
            <div id="navigation-echo" className="center-column-header">
              <div className="home-header">
                <span>Home</span>
              </div>
              <div>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="sparkly-thingy"
                >
                  <g>
                    <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <ComposeTweet />
          <div id="newly-created-tweet"></div>
          <div id={loadingDivId}></div>
          <div id={feedId}></div>
        </div>
        <div className="right-column column" id="news-feed">
          <div id="whats-happening">
            <div className="right-title">
              <h3>What's happening</h3>
            </div>
            <div className="wh-entry">
              <div>
                <div>
                  <span>World news · LIVE</span>
                </div>
                <div>
                  <b className="heading">
                    The UN General Assembly continues in New York
                  </b>
                </div>
              </div>
              <div className="image-wrapper">
                <img src={`${ASSETS}/img/whats-happening/pbs.jpg`} />
              </div>
            </div>
            <div className="wh-entry">
              <div>
                <div>
                  <span>COVID-19 · LIVE</span>
                </div>
                <div>
                  <b className="heading">
                    COVID-19: News and updates for Provo, Utah
                  </b>
                </div>
              </div>
              <div className="image-wrapper">
                <img src={`${ASSETS}/img/whats-happening/covid.jpg`} />
              </div>
            </div>
            <div className="wh-entry">
              <div>
                <div>
                  <span>Trending in United States</span>
                </div>
                <div>
                  <b className="heading">#SomethingCool</b>
                </div>
              </div>
              <div className="image-wrapper">
                <img src={`${ASSETS}/img/whats-happening/pbs.jpg`} />
              </div>
            </div>
          </div>
          <div id="who-to-follow">
            <div className="right-title">
              <h3>Who to follow</h3>
            </div>
            <div className="wf-entry">
              <div className="profile-pic">
                <img src={`${ASSETS}/img/who-to-follow/faraz.jpg`} />
              </div>
              <div className="profile-info">
                <b>faraz ahmad</b>
                <span>@farazamiruddin</span>
              </div>
              <div className="follow-button-wrapper">
                <button className="follow">Follow</button>
              </div>
            </div>
            <div className="wf-entry">
              <div className="profile-pic">
                <img src={`${ASSETS}/img/who-to-follow/camp.jpg`} />
              </div>
              <div className="profile-info">
                <b>Beyond Code Bootcamp</b>
                <span>@_beyondcode</span>
              </div>
              <div className="follow-button-wrapper">
                <button className="follow">Follow</button>
              </div>
            </div>
            <div className="wf-entry">
              <div className="profile-pic">
                <img src={`${ASSETS}/img/who-to-follow/fem.jpg`} />
              </div>
              <div className="profile-info">
                <b>Frontend Masters</b>
                <span>@FrontendMasters</span>
              </div>
              <div className="follow-button-wrapper">
                <button className="follow">Follow</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div id="login-tracker"></div>
    </div>
  );
}

export default Home;
