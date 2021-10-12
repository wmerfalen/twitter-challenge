import fetchTweets from "./fetch-tweets";
import Config from "../config/";
import Url from "../url";

const Network = {
  config: Config,
  pageChanged: function (href) {
    if (Url.shouldFetch(href)){
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
