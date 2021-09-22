var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function LoginTracker() {
    var LOGIN_STATE = 'login-state';

    var _React$useState = React.useState(window.localStorage.getItem(LOGIN_STATE) || 'logged-out'),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        loginState = _React$useState2[0],
        setLoginState = _React$useState2[1];

    React.useEffect(function () {
        setLoginState(loginState);
    });
    if (loginState !== 'logged-in') {
        window.location.href = '/public/twitter/dist';
        return React.createElement('div', null);
    }
    return React.createElement(
        'div',
        null,
        'Logged in'
    );
}
ReactDOM.render(React.createElement(LoginTracker, null), document.getElementById('login-tracker'));