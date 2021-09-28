import TweetVisibility from './visibility.js';
import Tweet from './tweet.js';
import LoginState from './login-tracker.js';
import IdProvider from './id-provider.js';

const MAX_TWEET_LENGTH = 280;
const WARN_LENGTH = MAX_TWEET_LENGTH - 20;
const VISIBILITY = 'visibility-preference';
function ComposeTweet(){
    /**
     * State variables
     */
    const [tweet,setTweet] = React.useState('');
    const [canPublish,setCanPublish] = React.useState(true);
    const [currentlyEditing,setCurrentlyEditing] = React.useState(false);

    /**
     * References to html elements
     */
    let content = React.useRef(null);
    let lettersLeft = React.useRef(MAX_TWEET_LENGTH);
    let publishButton = React.useRef(null);

    /**
     * Publish to the timeline
     */
    function appendRow(row){
        let existing = window.localStorage.getItem('tweets');
        if(!existing){
            window.localStorage.setItem('tweets',JSON.stringify([row]));
            return;
        }
        existing = JSON.parse(existing);
        existing.push(row);
        window.localStorage.setItem('tweets',JSON.stringify(existing));
    }

    React.useEffect(() => {
        if(tweet.length === 0 && currentlyEditing === false){
            content.current.innerText = "What's happening?";
        }
        if(canPublish === false){
            publishButton.current.classList.add('disabled');
            return;
        }
        publishButton.current.classList.remove('disabled');
    },[tweet,canPublish]);
    if(LoginState().isLoggedIn() === false){
        return (<div></div>);
    }
    function publish(){
        if(tweet === null || tweet.length === 0 || canPublish === false){
            return;
        }
        let div = document.createElement('div');

        let row = {
            id: IdProvider().next(),
            from: 'William Merfalen',
            userName: '@lmdbkraft',
            timeStamp: (new Date()).getTime(),
            contentType: 'tweet',
            "body": tweet,
            "replyCount": 0,
            "retweets": 0,
            "hearts": 0,
            lense: window.localStorage.getItem(VISIBILITY),
        };
        appendRow(row);
        ReactDOM.render(
            <Tweet tweet={row}/>,
            document.getElementById('newly-created-tweet').appendChild(div)
        );
        content.current.innerText = "What's happening?";
    }
    function keyLogger(){
        setTweet(content.current.innerText);
        setCurrentlyEditing(true);
        const len = content.current.innerText.length;
        if(len >= WARN_LENGTH && len < MAX_TWEET_LENGTH){
            lettersLeft.current.classList.add('tweet-len-warning');
            lettersLeft.current.classList.remove('tweet-len-overflow');
            lettersLeft.current.innerText = MAX_TWEET_LENGTH - len;
            setCanPublish(true);
            return;
        }
        if(len >= MAX_TWEET_LENGTH){
            lettersLeft.current.classList.remove('tweet-len-warning');
            lettersLeft.current.classList.add('tweet-len-overflow');
            lettersLeft.current.innerText = MAX_TWEET_LENGTH - len;
            if(len === MAX_TWEET_LENGTH){
                setCanPublish(true);
                return;
            }
            setCanPublish(false);
            return;
        }
        lettersLeft.current.innerText = '';
        setCanPublish(true);
    }
    function togglePlaceholder(){
        if(tweet.length === 0){
            setCurrentlyEditing(false);
            content.current.innerHTML = '';
        }
    }
    function forcePlaceholderOff(){
        setCurrentlyEditing(false);
        if(tweet.length === 0){
            content.current.innerHTML = "What's happening?";
        }
    }
    return (
        <div className="compose-wrapper">
          <div className="profile-image-wrapper">
            <img src="assets/img/me.jpg" className="profile-image"/>
          </div>
          <div className="compose-tweet">
            <div>
              <div contentEditable ref={content} type="text" name="tweet" onKeyUp={() => keyLogger()} onKeyDown={() => keyLogger()} onFocus={togglePlaceholder} onClick={togglePlaceholder} onBlur={forcePlaceholderOff}></div>
            </div>
            <div>
              <TweetVisibility initialState="everyone"/>
            </div>
            <div className="tweet-options">
              <div></div>
              <div id="tweet-button-wrapper">
                <div ref={lettersLeft} className="letters-left"></div>
                <div>
                    <button ref={publishButton} className="tweet-button" onClick={publish}>Tweet</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

ReactDOM.render(
    <ComposeTweet/>,
    document.getElementById('compose-tweet')
);
