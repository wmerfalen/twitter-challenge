
import Tweet from './tweet.js';

function fetchTweets(){
    return new Promise(function (resolve, reject) {
        fetch('/public/twitter/dist/api/tweets.json').then(function(response){
            response.json().then(resolve).catch(reject);
        }).catch(reject);
    });
}
function TweetFeed(){
    let tweets = [];
    fetchTweets().then(function(data){
        let existing = window.localStorage.getItem('tweets');
        let all = data
        if(existing){
            existing = JSON.parse(existing);
            all = [...existing,...data];
            all.sort(function(a,b){ return parseInt(b.timeStamp) - parseInt(a.timeStamp); });
        }
        for(let tweet of all){
            let div = document.createElement('div');
            div.classList.add('tweet');
            ReactDOM.render(
                <Tweet tweet={tweet}/>,
                document.getElementById('main-feed').appendChild(div)
            );
        }
    }).catch(console.error);
    return (
        <div>
            <b>Tweet feed</b>
        </div>
    );
}

ReactDOM.render(
    <TweetFeed/>,
    document.getElementById('tweets')
);
