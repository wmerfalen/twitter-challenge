var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function LoginState() {
    var LOGIN_STATE = 'login-state';
    return {
        get: function get() {
            return window.localStorage.getItem(LOGIN_STATE);
        },
        set: function set(s) {
            window.localStorage.setItem(LOGIN_STATE, s);
        },
        isLoggedIn: function isLoggedIn() {
            return window.localStorage.getItem(LOGIN_STATE) === 'logged-in';
        }
    };
}
function LoginTracker() {
    var logoutButton = React.useRef();

    var _React$useState = React.useState(LoginState().get()),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        loginState = _React$useState2[0],
        setLoginState = _React$useState2[1];

    var _React$useState3 = React.useState(null),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        page = _React$useState4[0],
        setPageTo = _React$useState4[1];

    React.useEffect(function () {
        LoginState().set(loginState);
        if (['login', 'signup'].indexOf(page) > -1) {
            window.location.href = '/clones/index.html';
        }
    });
    if (LoginState().isLoggedIn() === false) {
        document.getElementById('navigation-echo').classList.add('hidden');
        return React.createElement(
            'div',
            { className: 'fixed-login-banner' },
            React.createElement('div', null),
            React.createElement(
                'div',
                { className: 'dont-miss' },
                React.createElement(
                    'div',
                    { className: 'dm-top' },
                    React.createElement(
                        'b',
                        null,
                        'Don\'t miss what\'s happening'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'dm-bottom' },
                    'People on Twitter are the first to know.'
                )
            ),
            React.createElement(
                'div',
                { className: 'buttons' },
                React.createElement(
                    'button',
                    { className: 'login', onClick: function onClick() {
                            return setPageTo('login');
                        } },
                    'Log in'
                ),
                React.createElement(
                    'button',
                    { className: 'sign-up', onClick: function onClick() {
                            return setPageTo('signup');
                        } },
                    'Sign up'
                )
            )
        );
    }
    return React.createElement(
        'div',
        { className: 'fixed-login-banner' },
        'Logged in ',
        React.createElement(
            'button',
            { onClick: function onClick() {
                    setLoginState('logged-out');window.location.reload();
                } },
            'Click here to log out'
        )
    );
}

export default LoginState;

ReactDOM.render(React.createElement(LoginTracker, null), document.getElementById('login-tracker'));
