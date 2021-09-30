import ComposeTweet from './compose-tweet.js';
import Tweet from './tweet.js';

var FLOATING_REPLY_DIV = 'floating-reply-div';
function FloatingReply(_ref) {
    var for_tweet = _ref.for_tweet;

    function dismiss() {
        var popup = document.getElementById(FLOATING_REPLY_DIV);
        if (popup) {
            popup.remove();
        }
    }

    return React.createElement(
        'div',
        { className: 'floater-wrapper' },
        React.createElement(
            'div',
            { className: 'header' },
            React.createElement(
                'h1',
                { className: 'dismiss', onClick: dismiss },
                'X'
            )
        ),
        React.createElement(
            'div',
            { className: 'tweet' },
            React.createElement(Tweet, { tweet: for_tweet, floating: true })
        ),
        React.createElement(
            'div',
            { className: 'compose-tweet-wrapper' },
            React.createElement(ComposeTweet, { floating: true })
        )
    );
}
export default FloatingReply;