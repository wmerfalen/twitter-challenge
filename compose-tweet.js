var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import TweetVisibility from './visibility.js';
import Tweet from './tweet.js';
import LoginState from './login-tracker.js';
import IdProvider from './id-provider.js';

var MAX_TWEET_LENGTH = 280;
var WARN_LENGTH = MAX_TWEET_LENGTH - 20;
var VISIBILITY = 'visibility-preference';
var FLOATING_REPLY_DIV = 'floating-reply-div';

function extract(obj, name) {
    var fallbackValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (typeof obj[name] !== 'undefined') {
        return obj[name];
    }
    return fallbackValue;
}
function ComposeTweet(props) {
    var floating = extract(props, 'floating', false);
    var originalTweet = extract(props, 'originalTweet', null);

    /**
     * State variables
     */

    var _React$useState = React.useState(''),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        tweet = _React$useState2[0],
        setTweet = _React$useState2[1];

    var _React$useState3 = React.useState(true),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        canPublish = _React$useState4[0],
        setCanPublish = _React$useState4[1];

    var _React$useState5 = React.useState(false),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        currentlyEditing = _React$useState6[0],
        setCurrentlyEditing = _React$useState6[1];

    /**
     * References to html elements
     */


    var content = React.useRef(null);
    var lettersLeft = React.useRef(MAX_TWEET_LENGTH);
    var publishButton = React.useRef(null);

    function placePlaceholderText() {
        if (!content.current) {
            /** User is logged out */
            return;
        }
        if (floating) {
            content.current.innerHTML = "<span class='wh-placeholder'>Add another Tweet</span>";
            return;
        }
        content.current.innerHTML = "<span class='wh-placeholder'>What's happening?</span>";
    }
    /**
     * Publish to the timeline
     */
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
        if (tweet.length === 0 && currentlyEditing === false) {
            placePlaceholderText();
        }
        if (!publishButton.current) {
            /** User is logged out */
            return;
        }
        if (canPublish === false) {
            publishButton.current.classList.add('disabled');
            return;
        }
        publishButton.current.classList.remove('disabled');
    }, [tweet, canPublish]);
    if (LoginState().isLoggedIn() === false) {
        return React.createElement('div', null);
    }
    function publish() {
        if (tweet === null || tweet.length === 0 || canPublish === false) {
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
        if (originalTweet) {
            row.contentType = ['reply', originalTweet.id].join('|');
        }
        appendRow(row);
        ReactDOM.render(React.createElement(Tweet, { tweet: row }), document.getElementById('newly-created-tweet').appendChild(div));
        placePlaceholderText();
        if (floating) {
            var floater = document.getElementById(FLOATING_REPLY_DIV);
            if (floater) {
                floater.remove();
            }
        }
    }
    function trimmed(tweet) {
        return tweet.replace(/\n/, '');
    }
    function keyLogger(event, direction) {
        setTweet(content.current.innerText);
        setCurrentlyEditing(true);
        var len = content.current.innerText.length;
        if (len >= WARN_LENGTH && len < MAX_TWEET_LENGTH) {
            lettersLeft.current.classList.add('tweet-len-warning');
            lettersLeft.current.classList.remove('tweet-len-overflow');
            lettersLeft.current.innerText = MAX_TWEET_LENGTH - len;
            setCanPublish(true);
            return;
        }
        if (len >= MAX_TWEET_LENGTH) {
            lettersLeft.current.classList.remove('tweet-len-warning');
            lettersLeft.current.classList.add('tweet-len-overflow');
            lettersLeft.current.innerText = MAX_TWEET_LENGTH - len;
            if (len === MAX_TWEET_LENGTH) {
                setCanPublish(true);
                return;
            }
            setCanPublish(false);
            return;
        }
        lettersLeft.current.innerText = '';
        setCanPublish(true);
    }
    function togglePlaceholder() {
        if (trimmed(tweet).length === 0) {
            setCurrentlyEditing(false);
        }
    }
    function forcePlaceholderOff() {
        setCurrentlyEditing(false);
        if (trimmed(tweet).length === 0) {
            placePlaceholderText();
        }
    }
    function forceFocusToComposer() {
        if (content.current.innerHTML.match(/<span class="wh-placeholder">/)) {
            content.current.innerHTML = '';
        }

        content.current.setAttribute('contenteditable', true);
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
            { className: 'compose-tweet', onClick: forceFocusToComposer },
            React.createElement('p', { contentEditable: true, ref: content, name: 'tweet', onKeyUp: function onKeyUp(event) {
                    return keyLogger(event, 'up');
                }, onKeyDown: function onKeyDown(event) {
                    return keyLogger(event, 'down');
                }, onFocus: togglePlaceholder, onBlur: forcePlaceholderOff, onClick: forceFocusToComposer }),
            React.createElement(
                'div',
                null,
                floating ? '' : React.createElement(TweetVisibility, { initialState: 'everyone' })
            ),
            React.createElement(
                'div',
                { className: 'tweet-options' },
                React.createElement('div', null),
                React.createElement(
                    'div',
                    { id: 'tweet-button-wrapper' },
                    React.createElement('div', { ref: lettersLeft, className: 'letters-left' }),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'button',
                            { ref: publishButton, className: 'tweet-button', onClick: publish },
                            'Tweet'
                        )
                    )
                )
            )
        )
    );
}

export default ComposeTweet;