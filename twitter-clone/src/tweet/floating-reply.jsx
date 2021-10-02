import ComposeTweet from './compose-tweet.js';
import Tweet from './tweet.js';

const FLOATING_REPLY_DIV = 'floating-reply-div';
function FloatingReply({for_tweet}){
    function dismiss(){
        let popup = document.getElementById(FLOATING_REPLY_DIV);
        if(popup){
            popup.remove();
        }
    }

    return (
        <div className="floater-wrapper">
            <div className="header">
                <h1 className="dismiss" onClick={dismiss}>X</h1>
            </div>
            <div className="tweet">
                <Tweet tweet={for_tweet} floating={true}/>
            </div>
            <div className="compose-tweet-wrapper">
                <ComposeTweet floating={true}/>
            </div>
        </div>
    );
}
export default FloatingReply;
