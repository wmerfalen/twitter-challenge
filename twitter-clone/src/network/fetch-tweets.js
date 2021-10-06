import Tweet from "../tweet/tweet";
import IdProvider from "../providers/id/id-provider";
import ReactDOM from "react-dom";

const randBetween = require("../utils").mentoc.rand.rand_between;

function fetchTweets(url, loadingDivId, feedId) {
  document.getElementById(feedId).innerHTML = "";
  function setLoadingStatus(status) {
    let h4 = document.getElementById(loadingDivId);
    if (h4) {
      h4.innerText = status;
    }
  }
  setLoadingStatus("Initiating connection with server...");
  setTimeout(function () {
    setLoadingStatus("Loading server data...");
    fetch(url)
      .then(function (response) {
        setLoadingStatus("Received server response...");
        response
          .json()
          .then(function (data) {
            setLoadingStatus("Server data fetched. Rendering content...");
            let existing = window.localStorage.getItem("tweets");
            let all = data;
            if (existing) {
              existing = JSON.parse(existing);
              all = [...existing, ...data];
              all.sort(function (a, b) {
                return parseInt(b.timeStamp) - parseInt(a.timeStamp);
              });
            }
            for (let tweet of all) {
              let div = document.createElement("div");
              div.classList.add("tweet");
              ReactDOM.render(
                <Tweet tweet={tweet} />,
                document.getElementById(feedId).appendChild(div)
              );
            }
            setLoadingStatus("Done.");
            setTimeout(function () {
              setLoadingStatus("");
            }, 1000);
          })
          .catch(function (issue) {
            setLoadingStatus(
              "Server sent weird response. Please contact support. support@fluxkraft-os.net"
            );
          });
      })
      .catch(function (issue) {
        console.error({ issue });
        setLoadingStatus(
          "Issue loading content. Contact support. support@fluxkraft-os.net"
        );
      });
  }, randBetween(1, 5) * 1000);
}

export default fetchTweets;
