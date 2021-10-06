import React from "react";
import ReactDOM from "react-dom";
import LoginState from "../storage/login-state";
import IdProvider from "../providers/id/id-provider";
import Tweet from "../tweet/tweet";

import TweetVisibility from "../tweet/tweet-visibility";
import Config from "../config/";
const MAX_TWEET_LENGTH = Config.MAX_TWEET_LENGTH;
const WARN_LENGTH = Config.WARN_LENGTH;
const VISIBILITY = "visibility-preference";
const FLOATING_REPLY_DIV = "floating-reply-div";

const xtract = require("../utils/").mentoc.array.xtract;

function ComposeTweet(props) {
  const ASSETS = Config.ASSETS_BASE_URL;
  const floating = xtract(props, "floating", false);
  const originalTweet = xtract(props, "originalTweet", null);

  /**
   * State variables
   */
  const [tweet, setTweet] = React.useState("");
  const [canPublish, setCanPublish] = React.useState(true);
  const [currentlyEditing, setCurrentlyEditing] = React.useState(false);

  /**
   * References to html elements
   */
  let content = React.useRef(null);
  let lettersLeft = React.useRef(MAX_TWEET_LENGTH);
  let publishButton = React.useRef(null);

  function placePlaceholderText() {
    if (!content.current) {
      /** User is logged out */
      return;
    }
    if (floating) {
      if (
        xtract(props, "tweet.userName", "").toLowerCase().replace(/@/, "") ===
        LoginState().currentUser()
      ) {
        content.current.innerHTML =
          "<span class='wh-placeholder'>Add another Tweet</span>";
        return;
      }
      content.current.innerHTML =
        "<span class='wh-placeholder'>Tweet your reply</span>";
      return;
    }
    content.current.innerHTML =
      "<span class='wh-placeholder'>What's happening?</span>";
  }
  /**
   * Publish to the timeline
   */
  function appendRow(row) {
    let existing = window.localStorage.getItem("tweets");
    if (!existing) {
      window.localStorage.setItem("tweets", JSON.stringify([row]));
      return;
    }
    existing = JSON.parse(existing);
    existing.push(row);
    window.localStorage.setItem("tweets", JSON.stringify(existing));
  }

  React.useEffect(() => {
    if (tweet.length === 0 && currentlyEditing === false) {
      placePlaceholderText();
    }
    if (!publishButton.current) {
      /** User is logged out */
      return;
    }
    if (canPublish === false) {
      publishButton.current.classList.add("disabled");
      return;
    }
    publishButton.current.classList.remove("disabled");
  });
  if (LoginState().isLoggedIn() === false) {
    return <div></div>;
  }
  function publish() {
    if (tweet === null || tweet.length === 0 || canPublish === false) {
      return;
    }
    let div = document.createElement("div");

    let row = {
      id: IdProvider().next(),
      from: "William Merfalen",
      userName: "@lmdbkraft",
      timeStamp: new Date().getTime(),
      contentType: "tweet",
      body: tweet,
      replyCount: 0,
      retweets: 0,
      hearts: 0,
      lense: window.localStorage.getItem(VISIBILITY),
    };
    if (originalTweet) {
      row.contentType = ["reply", originalTweet.id].join("|");
    }
    appendRow(row);
    ReactDOM.render(
      <Tweet tweet={row} type={originalTweet ? "reply" : "tweet"} />,
      document.getElementById("newly-created-tweet").appendChild(div)
    );
    placePlaceholderText();
    if (floating) {
      const floater = document.getElementById(FLOATING_REPLY_DIV);
      if (floater) {
        floater.remove();
      }
    }
  }
  function trimmed(tweet) {
    return tweet.replace(/\n/, "");
  }
  function keyLogger(event, direction) {
    setTweet(content.current.innerText);
    setCurrentlyEditing(true);
    const len = content.current.innerText.length;
    if (len >= WARN_LENGTH && len < MAX_TWEET_LENGTH) {
      lettersLeft.current.classList.add("tweet-len-warning");
      lettersLeft.current.classList.remove("tweet-len-overflow");
      lettersLeft.current.innerText = MAX_TWEET_LENGTH - len;
      setCanPublish(true);
      return;
    }
    if (len >= MAX_TWEET_LENGTH) {
      lettersLeft.current.classList.remove("tweet-len-warning");
      lettersLeft.current.classList.add("tweet-len-overflow");
      lettersLeft.current.innerText = MAX_TWEET_LENGTH - len;
      if (len === MAX_TWEET_LENGTH) {
        setCanPublish(true);
        return;
      }
      setCanPublish(false);
      return;
    }
    lettersLeft.current.innerText = "";
    setCanPublish(true);
  }
  function togglePlaceholder() {
    if (trimmed(tweet).length === 0) {
      setCurrentlyEditing(false);
    }
  }
  function forcePlaceholderOff() {
    setCurrentlyEditing(false);
    if (trimmed(tweet).length === 0) {
      placePlaceholderText();
    }
  }
  function forceFocusToComposer() {
    if (content.current.innerHTML.match(/<span class="wh-placeholder">/)) {
      content.current.innerHTML = "";
    }

    content.current.setAttribute("contenteditable", true);
  }
  return (
    <div id="compose-tweet">
      <div className="compose-wrapper">
        <div className="profile-image-wrapper">
          <img
            alt="@lmdbkraft profile pic"
            src={`${ASSETS}/img/me.jpg`}
            className="profile-image"
          />
        </div>
        <div className="compose-tweet" onClick={forceFocusToComposer}>
          <p
            contentEditable={true}
            ref={content}
            name="tweet"
            onKeyUp={(event) => keyLogger(event, "up")}
            onKeyDown={(event) => keyLogger(event, "down")}
            onFocus={togglePlaceholder}
            onBlur={forcePlaceholderOff}
            onClick={forceFocusToComposer}
          ></p>
          <div>
            {floating ? "" : <TweetVisibility initialState="everyone" />}
          </div>
          <div className="tweet-options">
            <div></div>
            <div id="tweet-button-wrapper">
              <div ref={lettersLeft} className="letters-left"></div>
              <div>
                <button
                  ref={publishButton}
                  className="tweet-button"
                  onClick={publish}
                >
                  {floating ? "Reply" : "Tweet"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComposeTweet;
