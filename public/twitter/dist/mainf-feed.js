var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import NavIcon from './nav-icon.js';

function LeftNav() {
    var _React$useState = React.useState(window.location.href.split('public/twitter/dist/')[1]),
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

    React.useEffect(function () {
        console.log('useEffects: ', { page: page });
        window.location.href = 'https://wmerfalen.github.io/clones/public/twitter/dist/home.html#' + page;
    });
    return React.createElement(
        'div',
        null,
        React.createElement(NavIcon, { type: 'twitter', clickHandler: setPage, active: isTwitter() }),
        React.createElement(NavIcon, { type: 'home', clickHandler: setPage, active: isHome() }),
        React.createElement(NavIcon, { type: 'messages', clickHandler: setPage, active: isMessages() }),
        React.createElement(NavIcon, { type: 'explore', clickHandler: setPage, active: isExplore() }),
        React.createElement(NavIcon, { type: 'notifications', clickHandler: setPage, active: isNotifications() }),
        React.createElement(NavIcon, { type: 'bookmarks', clickHandler: setPage, active: isBookmarks() }),
        React.createElement(NavIcon, { type: 'lists', clickHandler: setPage, active: isLists() }),
        React.createElement(NavIcon, { type: 'profile', clickHandler: setPage, active: isProfile() }),
        React.createElement(NavIcon, { type: 'more', clickHandler: setPage, active: isMore() })
    );
}

ReactDOM.render(React.createElement(LeftNav, null), document.getElementById('left-nav'));