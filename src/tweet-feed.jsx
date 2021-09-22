
import Tweet from './tweet.js';

function fetchTweets(){
    console.log('fetch tweets');
    return new Promise(function (resolve, reject) {
        fetch('/public/twitter/dist/api/tweets.json').then(function(response){
            response.json().then(resolve).catch(reject);
        }).catch(reject);
    });
}
function TweetFeed(){
    console.log('tweet feed');
    let tweets = [];
    fetchTweets().then(function(data){
        for(let tweet of data){
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
