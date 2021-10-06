import React from "react";
import Config from "../config/";

//const POPUP_ID = "tweet-visibility-popup";
//const BACKDROP_ID = "tweet-visibility-backdrop";
const VISIBILITY = "visibility-preference";
const VISIBILITY_WRAPPER_ID = "visibility-wrapper";
const OFFSET_LEFT = -80;
const OFFSET_TOP = 50;
function FloatingVisibilityBox({ eventInfo, placeResultAt }) {
  const ASSETS = Config.ASSETS_BASE_URL;
  const [visibility, setVisibility] = React.useState(
    window.localStorage.getItem(VISIBILITY)
  );
  React.useEffect(() => {
    switch (visibility) {
      default:
      case "everyone":
        placeResultAt.current.innerHTML = `<img class="visibility-icon" src="${ASSETS}/img/font-awesome-svgs/globe.svg"/> Everyone can reply`;
        break;
      case "follow":
        placeResultAt.current.innerHTML = `<img class="visibility-icon" src="${ASSETS}/img/font-awesome-svgs/users.svg"/> People you follow can reply`;
        break;
      case "mention":
        placeResultAt.current.innerHTML = `<img class="visibility-icon" src="${ASSETS}/img/font-awesome-svgs/lock.svg"/> Only people you mention can reply`;
        break;
    }
    window.localStorage.setItem(VISIBILITY, visibility);
  });
  const element = document.getElementById(VISIBILITY_WRAPPER_ID);
  const rect = element.getBoundingClientRect();
  const floatingStyle = {
    left: rect.left + OFFSET_LEFT + "px",
    top: rect.top + OFFSET_TOP + "px",
  };
  return (
    <span className="visibility-popup" style={floatingStyle}>
      <h4>Who can reply?</h4>
      <p className="description">
        Choose who can reply to this Tweet.
        <br />
        Anyone mentioned can always reply.
      </p>
      <div className="selection" onClick={() => setVisibility("everyone")}>
        <div>
          <img
            alt="everyone"
            className="visibility-icon"
            src={`${ASSETS}/img/font-awesome-svgs/globe.svg`}
          />
        </div>
        <div>Everyone</div>
        <div className="check-mark">
          {visibility === "everyone" ? (
            <img
              alt="everyone"
              src={`${ASSETS}/img/font-awesome-svgs/check.svg`}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="selection" onClick={() => setVisibility("follow")}>
        <div>
          <img
            alt="follow"
            className="visibility-icon"
            src={`${ASSETS}/img/font-awesome-svgs/users.svg`}
          />
        </div>
        <div>People you follow</div>
        <div className="check-mark">
          {visibility === "follow" ? (
            <img
              alt="follow"
              src={`${ASSETS}/img/font-awesome-svgs/check.svg`}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="selection" onClick={() => setVisibility("mention")}>
        <div>
          <img
            alt="mentions"
            className="visibility-icon"
            src={`${ASSETS}/img/font-awesome-svgs/lock.svg`}
          />
        </div>
        <div>Only people you mention</div>
        <div className="check-mark">
          {visibility === "mention" ? (
            <img
              alt="mentions"
              src={`${ASSETS}/img/font-awesome-svgs/check.svg`}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </span>
  );
}

export default FloatingVisibilityBox;
