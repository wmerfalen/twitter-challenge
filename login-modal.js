var POPUP_ID = 'tweet-login-popup';
var BACKDROP_ID = 'tweet-login-backdrop';
var MODAL_WRAPPER_ID = 'login-modal-wrapper';
function LoginPrompter(_ref) {
    var wrapperId = _ref.wrapperId;

    function dismiss() {
        document.getElementById(MODAL_WRAPPER_ID).remove();
    }
    function gotoLogin() {
        window.location.href = 'https://wmerfalen.github.io/clones/public/twitter/dist/';
    }
    return React.createElement(
        'div',
        { className: 'login-popup' },
        React.createElement(
            'h1',
            { onClick: dismiss },
            'X'
        ),
        React.createElement(
            'div',
            { className: 'heart' },
            React.createElement(
                'svg',
                { viewBox: '0 0 24 24', 'aria-hidden': 'true' },
                React.createElement(
                    'g',
                    null,
                    React.createElement('path', { d: 'M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'login-cta' },
            React.createElement(
                'h3',
                null,
                'Like a tweet to share the love'
            ),
            React.createElement(
                'p',
                { className: 'cta' },
                'Join Twitter now to let William Merfalen know you like their Tweet.'
            )
        ),
        React.createElement(
            'div',
            { className: 'login-wrapper' },
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'button',
                    { className: 'login', onClick: gotoLogin },
                    'Log in'
                )
            ),
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'button',
                    { className: 'sign-up', onClick: gotoLogin },
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

    return React.createElement(
        'div',
        null,
        React.createElement(LoginPrompter, { wrapperId: POPUP_ID })
    );
}
export default LoginModal;