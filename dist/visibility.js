
var POPUP_ID = 'tweet-visibility-popup';
var BACKDROP_ID = 'tweet-visibility-backdrop';
function FloatingVisibilityBox(_ref) {
    var eventInfo = _ref.eventInfo,
        placeResultAt = _ref.placeResultAt;

    function everyoneClicked(event) {
        event.preventDefault();
        placeResultAt.current.innerHTML = 'Everyone can reply';
    }
    function followClicked(event) {
        event.preventDefault();
        placeResultAt.current.innerHTML = 'People you follow can reply';
    }
    function mentionClicked(event) {
        event.preventDefault();
        placeResultAt.current.innerHTML = 'Only people you mention can reply';
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
                React.createElement('img', { src: 'assets/img/font-awesome-svgs/compass.svg' }),
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
                React.createElement('img', { src: 'assets/img/font-awesome-svgs/users.svg' }),
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
                React.createElement('img', { src: 'assets/img/font-awesome-svgs/compass.svg' }),
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
        div.onclick = function () {
            var popup = document.getElementById(POPUP_ID);
            popup.remove();
            var backdrop = document.getElementById(BACKDROP_ID);
            backdrop.remove();
        };
        document.body.appendChild(div);

        div = document.createElement('div');
        div.id = POPUP_ID;
        div.classList.remove('backdrop');
        div.onclick = function () {
            var popup = document.getElementById(POPUP_ID);
            popup.remove();
        };
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
                    'svg',
                    { viewBox: '0 0 24 24', 'aria-hidden': 'true' },
                    React.createElement(
                        'g',
                        null,
                        React.createElement('path', { d: 'M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5zM9.047 5.9c-.878.484-1.22.574-1.486.858-.263.284-.663 1.597-.84 1.712-.177.115-1.462.154-1.462.154s2.148 1.674 2.853 1.832c.706.158 2.43-.21 2.77-.142.342.07 2.116 1.67 2.324 2.074.208.404.166 1.748-.038 1.944-.204.196-1.183 1.09-1.393 1.39-.21.3-1.894 4.078-2.094 4.08-.2 0-.62-.564-.73-.848-.11-.284-.427-4.012-.59-4.263-.163-.25-1.126-.82-1.276-1.026-.15-.207-.552-1.387-.527-1.617.024-.23.492-1.007.374-1.214-.117-.207-2.207-1.033-2.61-1.18-.403-.145-.983-.332-.983-.332 1.13-3.652 4.515-6.318 8.52-6.38 0 0 .125-.018.186.14.11.286.256 1.078.092 1.345-.143.23-2.21.99-3.088 1.474zm11.144 8.24c-.21-.383-1.222-2.35-1.593-2.684-.23-.208-2.2-.912-2.55-1.09-.352-.177-1.258-.997-1.267-1.213-.01-.216 1.115-1.204 1.15-1.524.056-.49-1.882-1.835-1.897-2.054-.015-.22.147-.66.31-.81.403-.36 3.19.04 3.556.36 2 1.757 3.168 4.126 3.168 6.873 0 .776-.18 1.912-.282 2.18-.08.21-.443.232-.595-.04z' })
                    )
                ),
                React.createElement(
                    'span',
                    { ref: everyoneSpan },
                    'Everyone can reply'
                )
            )
        )
    );
}
ReactDOM.render(React.createElement(TweetVisibility, { initialState: 'everyone' }), document.getElementById('tweet-visibility'));