const POPUP_ID = 'tweet-visibility-popup';
const BACKDROP_ID = 'tweet-visibility-backdrop';
const VISIBILITY = 'visibility-preference';
function FloatingVisibilityBox({eventInfo,placeResultAt}){
    const [visibility,setVisibility] = React.useState(window.localStorage.getItem(VISIBILITY));
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
        window.localStorage.setItem(VISIBILITY,visibility);
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
            <div>
                <img className="visibility-icon" src="assets/img/font-awesome-svgs/globe.svg"/>
            </div>
            <div>
                Everyone
            </div>
            <div className="check-mark">
                {visibility === 'everyone' ? <img src="assets/img/font-awesome-svgs/check.svg"/> : ''}
            </div>
        </div>
        <div className="selection" onClick={() => setVisibility('follow')}>
            <div>
                <img className="visibility-icon" src="assets/img/font-awesome-svgs/users.svg"/>
            </div>
            <div>
                People you follow
            </div>
            <div className="check-mark">
                {visibility === 'follow' ? <img src="assets/img/font-awesome-svgs/check.svg"/> : ''}
            </div>
        </div>
        <div className="selection" onClick={() => setVisibility('mention')}>
            <div>
                <img className="visibility-icon" src="assets/img/font-awesome-svgs/lock.svg"/>
            </div>
            <div>
                Only people you mention
            </div>
            <div className="check-mark">
                {visibility === 'mention' ? <img src="assets/img/font-awesome-svgs/check.svg"/> : ''}
            </div>
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
        event.preventDefault();
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
        <div className="visibility-wrapper">
            <a onClick={handleClick}>
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
export default TweetVisibility;
