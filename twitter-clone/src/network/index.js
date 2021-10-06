import fetchTweets from "./fetch-tweets";
import Config from "../config/";

const Network = {
  config: Config,
  pageChanged: function (href) {
    console.log({ href });
    if (href.match(/^\/home/)) {
      Network.fetchTweets();
    }
  },
  fetchTweets: function () {
    fetchTweets(
      Network.config.TWEETS_DATA_SOURCE,
      Network.config.LOADING_DIV_ID,
      Network.config.FEED_ID
    );
  },
};

export default Network;
