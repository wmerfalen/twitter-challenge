
import Tweet from './tweet.js';
import IdProvider from './id-provider.js';

function fetchTweets(){
    return new Promise(function (resolve, reject) {
        fetch('/public/twitter/dist/api/tweets.json').then(function(response){
            response.json().then(resolve).catch(reject);
        }).catch(reject);
    });
}
function TweetFeed(){
    let tweets = [];
    const feed = document.getElementById('main-feed');
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = 'assets/img/loading.gif';

    const LOADING_DIV = 'loading-div';
    div.id = LOADING_DIV;
    div.classList.add('loading');
    div.appendChild(img);
    feed.appendChild(div);
    setTimeout(function(){
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
            div.remove();
        }).catch(console.error);
    }, 1000);
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
