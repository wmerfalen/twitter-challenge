function Login() {
    var LOGIN_STATE = 'login-state';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = document.querySelectorAll('.login-mechanism')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var link = _step.value;

            link.onclick = function (event) {
                event.preventDefault();
                window.localStorage.setItem(LOGIN_STATE, 'logged-in');
                window.location.href = '/public/twitter/dist/home.html';
            };
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
window.onload = Login;