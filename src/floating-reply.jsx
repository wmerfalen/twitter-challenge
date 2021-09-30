import ComposeTweet from './compose-tweet.js';
import Tweet from './tweet.js';

const floatingStyle = {
    position: 'absolute',
    left: '0px',
    top: '0px',
};
function FloatingReplyBox({tweet}){
    return (
    <span className="floater-popup" style={floatingStyle}>
        <div className="floater-selection">
            <div>
                <img className="floater-icon" src="assets/img/font-awesome-svgs/lock.svg"/>
            </div>
            <div>
                Only people you mention
            </div>
        </div>
    </span>
    );
}
function FloatingReply({for_tweet}){
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
            <FloatingReplyBox/>,
            document.body.appendChild(div)
        );
    }

    return (
        <div className="floater-wrapper" style={floatingStyle}>
            <div className="tweet">
                <Tweet tweet={for_tweet}/>
            </div>
            <div className="compose-tweet-wrapper">
                <ComposeTweet floating={true}/>
            </div>
        </div>
    );
}
export default FloatingReply;
