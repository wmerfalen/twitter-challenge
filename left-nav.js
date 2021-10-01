var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import NavIcon from './nav-icon.js';

function LeftNav() {
    var _React$useState = React.useState(window.location.href.split('#')[1]),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        page = _React$useState2[0],
        setPage = _React$useState2[1];

    var isTwitter = function isTwitter() {
        return page === 'twitter';
    };
    var isHome = function isHome() {
        return page === 'home';
    };
    var isMessages = function isMessages() {
        return page === 'messages';
    };
    var isExplore = function isExplore() {
        return page === 'explore';
    };
    var isNotifications = function isNotifications() {
        return page === 'notifications';
    };
    var isBookmarks = function isBookmarks() {
        return page === 'bookmarks';
    };
    var isLists = function isLists() {
        return page === 'lists';
    };
    var isProfile = function isProfile() {
        return page === 'profile';
    };
    var isMore = function isMore() {
        return page === 'more';
    };
    var isSettings = function isSettings() {
        return page === 'settings';
    };

    var loggedIn = window.localStorage.getItem('login-state') === 'logged-in';

    React.useEffect(function () {

        console.log('useEffects: ', { page: page });
        window.location.href = '/clones/home.html#' + page;
    });
    return React.createElement(
        'div',
        { className: 'nav-wrapper' },
        React.createElement(NavIcon, { loggedIn: loggedIn, type: 'twitter', clickHandler: setPage, active: isTwitter() }),
        React.createElement(NavIcon, { loggedIn: loggedIn, type: 'home', clickHandler: setPage, active: isHome() }),
        React.createElement(NavIcon, { loggedIn: loggedIn, type: 'messages', clickHandler: setPage, active: isMessages() }),
        React.createElement(NavIcon, { loggedIn: loggedIn, type: 'explore', clickHandler: setPage, active: isExplore() }),
        React.createElement(NavIcon, { loggedIn: loggedIn, type: 'notifications', clickHandler: setPage, active: isNotifications() }),
        React.createElement(NavIcon, { loggedIn: loggedIn, type: 'bookmarks', clickHandler: setPage, active: isBookmarks() }),
        React.createElement(NavIcon, { loggedIn: loggedIn, type: 'lists', clickHandler: setPage, active: isLists() }),
        React.createElement(NavIcon, { loggedIn: loggedIn, type: 'profile', clickHandler: setPage, active: isProfile() }),
        React.createElement(NavIcon, { loggedIn: loggedIn, type: 'more', clickHandler: setPage, active: isMore() }),
        React.createElement(NavIcon, { loggedIn: loggedIn, type: 'settings', clickHandler: setPage, active: isSettings() })
    );
}

ReactDOM.render(React.createElement(LeftNav, null), document.getElementById('left-nav'));
