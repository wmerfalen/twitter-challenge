
var POPUP_ID = 'tweet-visibility-popup';
var BACKDROP_ID = 'tweet-visibility-backdrop';
function FloatingVisibilityBox(_ref) {
    var eventInfo = _ref.eventInfo,
        placeResultAt = _ref.placeResultAt;

    function everyoneClicked(event) {
        event.preventDefault();
        placeResultAt.current.innerHTML = '<img class="visibility-icon" src="assets/img/font-awesome-svgs/globe.svg"/> Everyone can reply';
    }
    function followClicked(event) {
        event.preventDefault();
        placeResultAt.current.innerHTML = '<img class="visibility-icon" src="assets/img/font-awesome-svgs/users.svg"/> People you follow can reply';
    }
    function mentionClicked(event) {
        event.preventDefault();
        placeResultAt.current.innerHTML = '<img class="visibility-icon" src="assets/img/font-awesome-svgs/lock.svg"/> Only people you mention can reply';
    }
    var floatingStyle = {
        position: 'absolute',
        left: eventInfo.clientX + 'px',
        top: eventInfo.clientY + 'px',
        zIndex: 0,
        opacity: 1.0
    };
    return React.createElement(
        'span',
        { className: 'visibility-popup hidden floats-near', style: floatingStyle },
        React.createElement(
            'h4',
            null,
            'Who can reply?'
        ),
        React.createElement(
            'p',
            { className: 'description' },
            'Choose who can reply to this Tweet.',
            React.createElement('br', null),
            'Anyone mentioned can always reply.'
        ),
        React.createElement(
            'a',
            { href: 'javascript:void(0)', onClick: everyoneClicked },
            React.createElement(
                'div',
                { className: 'selection' },
                React.createElement('img', { className: 'visibility-icon', src: 'assets/img/font-awesome-svgs/globe.svg' }),
                React.createElement(
                    'p',
                    null,
                    'Everyone'
                )
            )
        ),
        React.createElement(
            'a',
            { href: 'javascript:void(0)', onClick: followClicked },
            React.createElement(
                'div',
                { className: 'selection' },
                React.createElement('img', { className: 'visibility-icon', src: 'assets/img/font-awesome-svgs/users.svg' }),
                React.createElement(
                    'p',
                    null,
                    'People you follow'
                )
            )
        ),
        React.createElement(
            'a',
            { href: 'javascript:void(0)', onClick: mentionClicked },
            React.createElement(
                'div',
                { className: 'selection' },
                React.createElement('img', { className: 'visibility-icon', src: 'assets/img/font-awesome-svgs/lock.svg' }),
                React.createElement(
                    'p',
                    null,
                    'Only people you mention'
                )
            )
        )
    );
}
function TweetVisibility() {

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

        ReactDOM.render(React.createElement(FloatingVisibilityBox, { eventInfo: event, placeResultAt: everyoneSpan }), document.body.appendChild(div));
    }

    return React.createElement(
        'div',
        null,
        React.createElement(
            'a',
            { href: 'javascript:void(0)', onClick: handleClick },
            React.createElement(
                'span',
                { className: 'tweet-visibility' },
                React.createElement(
                    'span',
                    { ref: everyoneSpan },
                    React.createElement('img', { className: 'visibility-icon', src: 'assets/img/font-awesome-svgs/globe.svg' }),
                    'Everyone can reply'
                )
            )
        )
    );
}
ReactDOM.render(React.createElement(TweetVisibility, { initialState: 'everyone' }), document.getElementById('tweet-visibility'));