import LoginState from "./login-state";

const { debounce, calculateTime } = require("../utils");

/**
 * Handles toggling of likes on a per tweet basis.
 */
function Likes(tweet) {
  return {
    toggle: function () {
      const id = tweet.id;
      let likes = window.localStorage.getItem(`likes-${id}`);
      likes = likes ? parseInt(likes) : 0;
      ++likes;
      document.getElementById(`${id}-likes`).classList.add("liked");
      if (likes > 1) {
        likes = 0;
        document.getElementById(`${id}-likes`).classList.remove("liked");
      }
      window.localStorage.setItem(`likes-${id}`, likes);
    },
    get: function () {
      const id = tweet.id;
      let likes = window.localStorage.getItem(`likes-${id}`);
      return likes ? parseInt(likes) : 0;
    },
    getLikes: function (in_tweet) {
      return Likes(in_tweet).get() + in_tweet.hearts;
    },
  };
}
/**
 * Fetch likes from localStorage wrapper
 */

/**
 * Turn on/off like by currently logged in user
 */
function toggleLikes(in_tweet, displayLoginModal) {
  if (LoginState().isLoggedIn() === false) {
    displayLoginModal();
    return;
  }
  Likes(in_tweet).toggle();
  const likeCount = in_tweet.hearts + Likes(in_tweet).get();
  if (likeCount) {
    document.getElementById(`${in_tweet.id}-likes`).innerText = likeCount;
  } else {
    document.getElementById(`${in_tweet.id}-likes`).innerText = "";
  }
}

function getClassFor(in_tweet) {
  let classes = "heart-counter";
  if (Likes(in_tweet).get()) {
    classes += " liked";
  }
  return classes;
}

module.exports = { getClassFor, toggleLikes, Likes };
