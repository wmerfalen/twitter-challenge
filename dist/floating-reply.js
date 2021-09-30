import ComposeTweet from './compose-tweet.js';
import Tweet from './tweet.js';

var floatingStyle = {
    position: 'absolute',
    left: '0px',
    top: '0px'
};
function FloatingReplyBox(_ref) {
    var tweet = _ref.tweet;

    return React.createElement(
        'span',
        { className: 'floater-popup', style: floatingStyle },
        React.createElement(
            'div',
            { className: 'floater-selection' },
            React.createElement(
                'div',
                null,
                React.createElement('img', { className: 'floater-icon', src: 'assets/img/font-awesome-svgs/lock.svg' })
            ),
            React.createElement(
                'div',
                null,
                'Only people you mention'
            )
        )
    );
}
function FloatingReply(_ref2) {
    var for_tweet = _ref2.for_tweet;

    function closeModals() {
        var popup = document.getElementById(POPUP_ID);
        if (popup) {
            popup.remove();
        }
        var backdrop = document.getElementById(BACKDROP_ID);
        if (backdrop) {
            backdrop.remove();
        }
    }
    var everyoneSpan = React.useRef();
    function handleClick(event) {
        event.preventDefault();
        var existing = document.getElementById(POPUP_ID);
        if (existing) {
            existing.remove();
        }
        existing = document.getElementById(BACKDROP_ID);
        if (existing) {
            existing.remove();
        }
        var div = document.createElement('div');
        div.id = BACKDROP_ID;
        div.classList.add('backdrop');
        div.onclick = closeModals;
        document.body.appendChild(div);

        div = document.createElement('div');
        div.id = POPUP_ID;
        div.classList.remove('backdrop');
        div.onclick = closeModals;

        ReactDOM.render(React.createElement(FloatingReplyBox, null), document.body.appendChild(div));
    }

    return React.createElement(
        'div',
        { className: 'floater-wrapper', style: floatingStyle },
        React.createElement(
            'div',
            { className: 'tweet' },
            React.createElement(Tweet, { tweet: for_tweet })
        ),
        React.createElement(
            'div',
            { className: 'compose-tweet-wrapper' },
            React.createElement(ComposeTweet, { floating: true })
        )
    );
}
export default FloatingReply;