function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import Tweet from './tweet.js';
import IdProvider from './id-provider.js';

function fetchTweets() {
    return new Promise(function (resolve, reject) {
        fetch('tweets.json').then(function (response) {
            response.json().then(resolve).catch(reject);
        }).catch(reject);
    });
}
function TweetFeed(_ref) {
    var setLoadingStatus = _ref.setLoadingStatus,
        messageId = _ref.messageId;

    var tweets = [];
    var feed = document.getElementById('main-feed');
    var div = document.createElement('div');
    var loadingMessage = document.createElement('h4');
    loadingMessage.id = messageId;

    setLoadingStatus('Loading...');

    var LOADING_DIV = 'loading-div';
    div.id = LOADING_DIV;
    div.classList.add('loading');
    div.appendChild(loadingMessage);

    feed.appendChild(div);
    setLoadingStatus('Grabbing content...');
    setTimeout(function () {
        setLoadingStatus('Loading server data...');
        fetchTweets().then(function (data) {
            setLoadingStatus('Server data fetched. Rendering content...');
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
            setLoadingStatus('Done.');
        }).catch(function (issue) {
            console.error({ issue: issue });
            setLoadingStatus('Issue loading content. Contact support. <a href="mailto:support@fluxkraft-os.net">support@fluxkraft-os.net</a>');
        });
    }, 1000);
    return React.createElement('div', null);
}

var LOADING_STATUS_MESSAGE_ID = 'loading-status-message';
function setStatus(status) {
    var div = document.getElementById(LOADING_STATUS_MESSAGE_ID);
    if (div) {
        div.innerText = status;
    }
}
ReactDOM.render(React.createElement(TweetFeed, { setLoadingStatus: setStatus, messageId: LOADING_STATUS_MESSAGE_ID }), document.getElementById('tweets'));
