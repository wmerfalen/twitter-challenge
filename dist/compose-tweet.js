var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import TweetVisibility from './visibility.js';
import Tweet from './tweet.js';
import LoginState from './login-tracker.js';
import IdProvider from './id-provider.js';

var VISIBILITY = 'visibility-preference';
function ComposeTweet() {
    var _React$useState = React.useState(''),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        tweet = _React$useState2[0],
        setTweet = _React$useState2[1];

    var content = React.useRef(null);
    function appendRow(row) {
        var existing = window.localStorage.getItem('tweets');
        if (!existing) {
            window.localStorage.setItem('tweets', JSON.stringify([row]));
            return;
        }
        existing = JSON.parse(existing);
        existing.push(row);
        window.localStorage.setItem('tweets', JSON.stringify(existing));
    }
    React.useEffect(function () {
        if (tweet === null || tweet.length === 0) {
            return;
        }
        var div = document.createElement('div');

        var row = {
            id: IdProvider().next(),
            from: 'William Merfalen',
            userName: '@lmdbkraft',
            timeStamp: new Date().getTime(),
            contentType: 'tweet',
            "body": tweet,
            "replyCount": 0,
            "retweets": 0,
            "hearts": 0,
            lense: window.localStorage.getItem(VISIBILITY)
        };
        appendRow(row);
        ReactDOM.render(React.createElement(Tweet, { tweet: row }), document.getElementById('newly-created-tweet').appendChild(div));
        content.current.value = '';
    }, [tweet]);
    if (LoginState().isLoggedIn() === false) {
        return React.createElement('div', null);
    }
    return React.createElement(
        'div',
        { className: 'compose-wrapper' },
        React.createElement(
            'div',
            { className: 'profile-image-wrapper' },
            React.createElement('img', { src: 'assets/img/me.jpg', className: 'profile-image' })
        ),
        React.createElement(
            'div',
            { className: 'compose-tweet' },
            React.createElement(
                'div',
                null,
                React.createElement('input', { ref: content, type: 'text', name: 'tweet', placeholder: 'What\'s happening?' })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(TweetVisibility, { initialState: 'everyone' })
            ),
            React.createElement(
                'div',
                { className: 'tweet-options' },
                React.createElement('div', null),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { className: 'tweet-button', onClick: function onClick() {
                                return setTweet(content.current.value);
                            } },
                        'Tweet'
                    )
                )
            )
        )
    );
}

ReactDOM.render(React.createElement(ComposeTweet, null), document.getElementById('compose-tweet'));