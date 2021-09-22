var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var POPUP_ID = 'tweet-visibility-popup';
var BACKDROP_ID = 'tweet-visibility-backdrop';
function FloatingVisibilityBox(_ref) {
    var eventInfo = _ref.eventInfo,
        placeResultAt = _ref.placeResultAt;

    var _React$useState = React.useState('everyone'),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        visibility = _React$useState2[0],
        setVisibility = _React$useState2[1];

    React.useEffect(function () {
        event.preventDefault();
        switch (visibility) {
            default:
            case 'everyone':
                placeResultAt.current.innerHTML = '<img class="visibility-icon" src="assets/img/font-awesome-svgs/globe.svg"/> Everyone can reply';
                break;
            case 'follow':
                placeResultAt.current.innerHTML = '<img class="visibility-icon" src="assets/img/font-awesome-svgs/users.svg"/> People you follow can reply';
                break;
            case 'mention':
                placeResultAt.current.innerHTML = '<img class="visibility-icon" src="assets/img/font-awesome-svgs/lock.svg"/> Only people you mention can reply';
                break;
        }
    });
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
            'div',
            { className: 'selection', onClick: function onClick() {
                    return setVisibility('everyone');
                } },
            React.createElement('img', { className: 'visibility-icon', src: 'assets/img/font-awesome-svgs/globe.svg' }),
            React.createElement(
                'p',
                null,
                'Everyone'
            )
        ),
        React.createElement(
            'div',
            { className: 'selection', onClick: function onClick() {
                    return setVisibility('follow');
                } },
            React.createElement('img', { className: 'visibility-icon', src: 'assets/img/font-awesome-svgs/users.svg' }),
            React.createElement(
                'p',
                null,
                'People you follow'
            )
        ),
        React.createElement(
            'div',
            { className: 'selection', onClick: function onClick() {
                    return setVisibility('mention');
                } },
            React.createElement('img', { className: 'visibility-icon', src: 'assets/img/font-awesome-svgs/lock.svg' }),
            React.createElement(
                'p',
                null,
                'Only people you mention'
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