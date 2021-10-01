
import Tweet from './tweet.js';
import IdProvider from './id-provider.js';

function fetchTweets(){
    return new Promise(function (resolve, reject) {
        fetch('tweets.json').then(function(response){
            response.json().then(resolve).catch(reject);
        }).catch(reject);
    });
}
function TweetFeed({setLoadingStatus,messageId}){
    let tweets = [];
    const feed = document.getElementById('main-feed');
    let div = document.createElement('div');
    let loadingMessage = document.createElement('h4');
    loadingMessage.id = messageId;

    setLoadingStatus('Loading...');

    const LOADING_DIV = 'loading-div';
    div.id = LOADING_DIV;
    div.classList.add('loading');
    div.appendChild(loadingMessage);

    feed.appendChild(div);
    setLoadingStatus('Grabbing content...');
    setTimeout(function(){
        setLoadingStatus('Loading server data...');
        fetchTweets().then(function(data){
            setLoadingStatus('Server data fetched. Rendering content...');
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
            setLoadingStatus('Done.');
        }).catch(function (issue) {
            console.error({issue});
            setLoadingStatus('Issue loading content. Contact support. <a href="mailto:support@fluxkraft-os.net">support@fluxkraft-os.net</a>');
        });
    }, 1000);
    return (
        <div></div>
    );
}

const LOADING_STATUS_MESSAGE_ID = 'loading-status-message';
function setStatus(status){
    let div = document.getElementById(LOADING_STATUS_MESSAGE_ID);
    if(div){
        div.innerText = status;
    }
}
ReactDOM.render(
    <TweetFeed setLoadingStatus={setStatus} messageId={LOADING_STATUS_MESSAGE_ID}/>,
    document.getElementById('tweets')
);
