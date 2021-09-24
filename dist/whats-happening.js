function WhatsHappeningBox(_ref) {
    var eventInfo = _ref.eventInfo,
        placeResultAt = _ref.placeResultAt;

    //const [visibility,setVisibility] = React.useState(window.localStorage.getItem(VISIBILITY));
    //React.useEffect(() => {
    //    event.preventDefault();
    //    switch(visibility){
    //        default:
    //        case 'everyone':
    //            placeResultAt.current.innerHTML = '<img class="visibility-icon" src="assets/img/font-awesome-svgs/globe.svg"/> Everyone can reply';
    //            break;
    //        case 'follow':
    //            placeResultAt.current.innerHTML = '<img class="visibility-icon" src="assets/img/font-awesome-svgs/users.svg"/> People you follow can reply';
    //            break;
    //        case 'mention':
    //            placeResultAt.current.innerHTML = '<img class="visibility-icon" src="assets/img/font-awesome-svgs/lock.svg"/> Only people you mention can reply';
    //            break;
    //    }
    //    window.localStorage.setItem(VISIBILITY,visibility);
    //})
    var floatingStyle = {
        left: eventInfo.clientX + 'px',
        top: eventInfo.clientY + 'px'
    };
    return React.createElement(
        'span',
        { className: 'visibility-popup', style: floatingStyle },
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
            React.createElement(
                'div',
                null,
                React.createElement('img', { className: 'visibility-icon', src: 'assets/img/font-awesome-svgs/globe.svg' })
            ),
            React.createElement(
                'div',
                null,
                'Everyone'
            ),
            React.createElement(
                'div',
                { className: 'check-mark' },
                visibility === 'everyone' ? React.createElement('img', { src: 'assets/img/font-awesome-svgs/check.svg' }) : ''
            )
        ),
        React.createElement(
            'div',
            { className: 'selection', onClick: function onClick() {
                    return setVisibility('follow');
                } },
            React.createElement(
                'div',
                null,
                React.createElement('img', { className: 'visibility-icon', src: 'assets/img/font-awesome-svgs/users.svg' })
            ),
            React.createElement(
                'div',
                null,
                'People you follow'
            ),
            React.createElement(
                'div',
                { className: 'check-mark' },
                visibility === 'follow' ? React.createElement('img', { src: 'assets/img/font-awesome-svgs/check.svg' }) : ''
            )
        ),
        React.createElement(
            'div',
            { className: 'selection', onClick: function onClick() {
                    return setVisibility('mention');
                } },
            React.createElement(
                'div',
                null,
                React.createElement('img', { className: 'visibility-icon', src: 'assets/img/font-awesome-svgs/lock.svg' })
            ),
            React.createElement(
                'div',
                null,
                'Only people you mention'
            ),
            React.createElement(
                'div',
                { className: 'check-mark' },
                visibility === 'mention' ? React.createElement('img', { src: 'assets/img/font-awesome-svgs/check.svg' }) : ''
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
        { className: 'visibility-wrapper' },
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