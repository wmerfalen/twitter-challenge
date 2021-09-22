
import Tweet from './tweet.js';

function fetchTweets() {
    console.log('fetch tweets');
    return new Promise(function (resolve, reject) {
        fetch('/public/twitter/dist/api/tweets.json').then(function (response) {
            response.json().then(resolve).catch(reject);
        }).catch(reject);
    });
}
function TweetFeed() {
    console.log('tweet feed');
    var tweets = [];
    fetchTweets().then(function (data) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var tweet = _step.value;

                var div = document.createElement('div');
                div.classList.add('tweet');
                ReactDOM.render(React.createElement(Tweet, { tweet: tweet }), document.getElementById('main-feed').appendChild(div));
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
    }).catch(console.error);
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