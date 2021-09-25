var POPUP_ID = 'tweet-login-popup';
var BACKDROP_ID = 'tweet-login-backdrop';
function FloatingVisibilityBox(_ref) {
    var wrapperId = _ref.wrapperId;

    var floatingStyle = {
        left: '0px',
        top: '0px',
        position: 'absolute'
    };
    return React.createElement(
        'div',
        { className: 'login-popup', style: floatingStyle },
        React.createElement(
            'h1',
            null,
            'X'
        ),
        React.createElement(
            'div',
            null,
            'Heart'
        ),
        React.createElement(
            'h3',
            null,
            'Like a tweet to share the love'
        ),
        React.createElement(
            'p',
            { className: 'description' },
            'Join Twitter now to let William Merfalen know you like their Tweet.'
        ),
        React.createElement(
            'div',
            { className: 'selection', onClick: function onClick() {
                    return setVisibility('everyone');
                } },
            React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { className: 'login' },
                    'Log in'
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { className: 'sign-up' },
                    'Sign up'
                )
            )
        )
    );
}
function LoginModal() {

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

        ReactDOM.render(React.createElement(FloatingVisibilityBox, { eventInfo: event, placeResultAt: everyoneSpan }), document.body.appendChild(div));
    }

    return React.createElement('div', null);
}
export default LoginModal;