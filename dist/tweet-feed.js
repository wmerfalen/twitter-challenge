function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import Tweet from './tweet.js';

function fetchTweets() {
    return new Promise(function (resolve, reject) {
        fetch('/public/twitter/dist/api/tweets.json').then(function (response) {
            response.json().then(resolve).catch(reject);
        }).catch(reject);
    });
}
function TweetFeed() {
    var tweets = [];
    var feed = document.getElementById('main-feed');
    var div = document.createElement('div');
    var img = document.createElement('img');
    img.src = 'assets/img/loading.gif';

    var LOADING_DIV = 'loading-div';
    div.id = LOADING_DIV;
    div.classList.add('loading');
    div.appendChild(img);
    feed.appendChild(div);
    setTimeout(function () {
        fetchTweets().then(function (data) {
            var existing = window.localStorage.getItem('tweets');
            var all = data;
            if (existing) {
                existing = JSON.parse(existing);
                all = [].concat(_toConsumableArray(existing), _toConsumableArray(data));
                all.sort(function (a, b) {
                    return parseInt(b.timeStamp) - parseInt(a.timeStamp);
                });
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tweet = _step.value;

                    var _div = document.createElement('div');
                    _div.classList.add('tweet');
                    ReactDOM.render(React.createElement(Tweet, { tweet: tweet }), document.getElementById('main-feed').appendChild(_div));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            div.remove();
        }).catch(console.error);
    }, 1000);
    return React.createElement(
        'div',
        null,
        React.createElement(
            'b',
            null,
            'Tweet feed'
        )
    );
}

ReactDOM.render(React.createElement(TweetFeed, null), document.getElementById('tweets'));