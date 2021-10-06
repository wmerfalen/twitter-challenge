function extract(obj, name, fallbackValue = null) {
  if (typeof obj[name] !== "undefined") {
    return obj[name];
  }
  return fallbackValue;
}
function debounce(func, delay) {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}
/** Utility function. should be in a lib */
function calculateTime(stamp) {
  const date = new Date(stamp);
  const MINUTE = 60,
    HOUR = MINUTE * 60,
    DAY = HOUR * 24,
    YEAR = DAY * 365;

  const secondsAgo = Math.round((+new Date() - date) / 1000);

  if (secondsAgo < MINUTE) {
    return secondsAgo + "s";
  } else if (secondsAgo < HOUR) {
    return Math.floor(secondsAgo / MINUTE) + "m";
  } else if (secondsAgo < DAY) {
    return Math.floor(secondsAgo / HOUR) + "h";
  } else if (secondsAgo < YEAR) {
    return date.toLocaleString("default", { day: "numeric", month: "short" });
  } else {
    return date.toLocaleString("default", { year: "numeric", month: "short" });
  }
}

function profilePic(tweet) {
  const user = tweet.userName
    .toLowerCase()
    .replace("@", "")
    .replace(/[^a-z0-9_]+/, "");
  return `assets/img/users/${user}.jpg`;
}

module.exports = {
  profilePic,
  debounce,
  calculateTime,
  extract,
  mentoc: require("@mentoc/utils"),
};
