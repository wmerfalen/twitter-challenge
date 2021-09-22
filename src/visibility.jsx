
const POPUP_ID = 'tweet-visibility-popup';
const BACKDROP_ID = 'tweet-visibility-backdrop';
function FloatingVisibilityBox({eventInfo,placeResultAt}){
    const [visibility,setVisibility] = React.useState('everyone');
    React.useEffect(() => {
        event.preventDefault();
        switch(visibility){
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
    })
    const floatingStyle = {
        left: eventInfo.clientX + 'px',
        top: eventInfo.clientY + 'px',
    };
    return (
        <span className="visibility-popup" style={floatingStyle}>
            <h4>Who can reply?</h4>
            <p className="description">
            Choose who can reply to this Tweet.<br/>
            Anyone mentioned can always reply.
            </p>
            <div className="selection" onClick={() => setVisibility('everyone')}>
                <img className="visibility-icon" src="assets/img/font-awesome-svgs/globe.svg"/>
                <p>Everyone</p>
            </div>
            <div className="selection" onClick={() => setVisibility('follow')}>
                <img className="visibility-icon" src="assets/img/font-awesome-svgs/users.svg"/>
                <p>People you follow</p>
            </div>
            <div className="selection" onClick={() => setVisibility('mention')}>
                <img className="visibility-icon" src="assets/img/font-awesome-svgs/lock.svg"/>
                <p>Only people you mention</p>
            </div>
        </span>
    );
}
function TweetVisibility(){

    function closeModals(){
        let popup = document.getElementById(POPUP_ID);
        if(popup){
            popup.remove();
        }
        let backdrop = document.getElementById(BACKDROP_ID);
        if(backdrop){
            backdrop.remove();
        }
    }
    const everyoneSpan = React.useRef();
    function handleClick(event) {
        let existing = document.getElementById(POPUP_ID);
        if(existing){
            existing.remove();
        }
        existing = document.getElementById(BACKDROP_ID);
        if(existing){
            existing.remove();
        }
        let div = document.createElement('div')
        div.id = BACKDROP_ID;
        div.classList.add('backdrop');
        div.onclick = closeModals;
        document.body.appendChild(div);

        div = document.createElement('div');
        div.id = POPUP_ID;
        div.classList.remove('backdrop');
        div.onclick = closeModals;

        ReactDOM.render(
            <FloatingVisibilityBox eventInfo={event} placeResultAt={everyoneSpan}/>,
            document.body.appendChild(div)
        );
    }

    return (
        <div>
            <a href="javascript:void(0)" onClick={handleClick}>
                <span className="tweet-visibility">
                    <span ref={everyoneSpan}>
                        <img className="visibility-icon" src="assets/img/font-awesome-svgs/globe.svg"/>
                        Everyone can reply
                    </span>
                </span>
            </a>
        </div>
    );
}
ReactDOM.render(
    <TweetVisibility initialState="everyone"/>,
    document.getElementById('tweet-visibility')
);
