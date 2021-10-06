import React from "react";
import ReactDOM from "react-dom";
import FloatingVisibilityBox from "./floating-visibility-box";
import Config from "../config/";

const POPUP_ID = "tweet-visibility-popup";
const BACKDROP_ID = "tweet-visibility-backdrop";

function TweetVisibility() {
  const ASSETS = Config.ASSETS_BASE_URL;
  function closeModals() {
    let popup = document.getElementById(POPUP_ID);
    if (popup) {
      popup.remove();
    }
    let backdrop = document.getElementById(BACKDROP_ID);
    if (backdrop) {
      backdrop.remove();
    }
  }
  const everyoneSpan = React.useRef();
  function handleClick(event) {
    event.preventDefault();
    let existing = document.getElementById(POPUP_ID);
    if (existing) {
      existing.remove();
    }
    existing = document.getElementById(BACKDROP_ID);
    if (existing) {
      existing.remove();
    }
    let div = document.createElement("div");
    div.id = BACKDROP_ID;
    div.classList.add("backdrop");
    div.onclick = closeModals;
    document.body.appendChild(div);

    div = document.createElement("div");
    div.id = POPUP_ID;
    div.classList.remove("backdrop");
    div.onclick = closeModals;

    ReactDOM.render(
      <FloatingVisibilityBox eventInfo={event} placeResultAt={everyoneSpan} />,
      document.body.appendChild(div)
    );
  }

  return (
    <div className="visibility-wrapper" id="visibility-wrapper">
      <div className="hover-cursor" onClick={handleClick}>
        <span className="tweet-visibility">
          <span ref={everyoneSpan}>
            <img
              alt="visibility icon"
              className="visibility-icon"
              src={`${ASSETS}/img/font-awesome-svgs/globe.svg`}
            />
            Everyone can reply
          </span>
        </span>
      </div>
    </div>
  );
}
export default TweetVisibility;
