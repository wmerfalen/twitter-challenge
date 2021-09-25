import TweetVisibility from './visibility.js';
import Tweet from './tweet.js';
import LoginState from './login-tracker.js';
import IdProvider from './id-provider.js';

const VISIBILITY = 'visibility-preference';
function ComposeTweet(){
    const [tweet,setTweet] = React.useState('');
    let content = React.useRef(null);
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
        if(tweet === null || tweet.length === 0){
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
        content.current.value='';
    },[tweet]);
    if(LoginState().isLoggedIn() === false){
        return (<div></div>);
    }
    return (
        <div className="compose-wrapper">
          <div className="profile-image-wrapper">
            <img src="assets/img/me.jpg" className="profile-image"/>
          </div>
          <div className="compose-tweet">
            <div>
              <input ref={content} type="text" name="tweet" placeholder="What's happening?"/>
            </div>
            <div>
              <TweetVisibility initialState="everyone"/>
            </div>
            <div className="tweet-options">
              <div></div>
              <div>
                <button className="tweet-button" onClick={() => setTweet(content.current.value)}>Tweet</button>
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
