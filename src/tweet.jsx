
import NavIcon from './nav-icon.js';
import IdProvider from './id-provider.js';
import LoginState from './login-tracker.js';
import LoginModal from './login-modal.js';

function Likes(tweet){
    return {
        toggle: function(){
            const id = tweet.id;
            let likes = window.localStorage.getItem(`likes-${id}`);
            likes = likes ? parseInt(likes) : 0;
            ++likes;
            document.getElementById(`${id}-likes`).classList.add('liked');
            if(likes > 1){
                likes = 0;
                document.getElementById(`${id}-likes`).classList.remove('liked');
            }
            window.localStorage.setItem(`likes-${id}`,likes);
        },
        get: function(){
            const id = tweet.id;
            let likes = window.localStorage.getItem(`likes-${id}`);
            return likes ? parseInt(likes) : 0;
        },
    };
}
const FLOATING_PROFILE_DIV = 'floating-profile-div';
const BACKDROP_ID = 'floating-profile-backdrop';
let currentlyShowing = null;
let close = true;
function debounce(func, delay){
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
} 
function closeFloatingProfileDiv(){
        if(!close){
            return;
        }
        let existing = document.getElementById(FLOATING_PROFILE_DIV);
        if(existing){
            existing.remove();
        }
        currentlyShowing = null;
}
function FloatingProfile({left,top,tweet}){
    const floatingStyle = {
        position: 'absolute',
        left: (left - 80) + 'px',
        top: (top +20) + 'px',
    };
    function getUserProfilePic(tweet){
        return `assets/img/users/${tweet.userName.replace(/@/,'').toLowerCase()}.jpg`;
    }
    function mouseOverFloatingDiv(){
        close = false;
    }
    const mouseLeftFloatingDiv = debounce(function(){
        close = true;
        closeFloatingProfileDiv();
    },1000);
    return (
    <span className="floating-profile" style={floatingStyle} onMouseOver={mouseOverFloatingDiv} onMouseLeave={mouseLeftFloatingDiv}>
        <div className="header">
            <div>
                <img src={getUserProfilePic(tweet)}/>
            </div>
            <div>
                <div className="following-status">
                    <b>Following</b>
                </div>
            </div>
        </div>
        <div className="profile-description">
            <div>
                <h4>{tweet.name}</h4>
            </div>
            <div>
                    {tweet.userName}
            </div>
            <div>
                Doing things is what I do
            </div>
            <div>
                <div className="following"> 
                    <b>321</b>
                    <span>Following</span>
                </div>
                <div className="followers"> 
                    <b>321</b>
                    <span>Followers</span>
                </div>
            </div>
            <div>
                <div>Followed by .... </div>
            </div>
        </div>
    </span>
    );
}
function Tweet({tweet}){
    function displayLoginModal(){
        let div = document.createElement('div');
        div.id = 'login-modal-wrapper';
        ReactDOM.render(
            <LoginModal wrapperId={div.id}/>,
            document.body.appendChild(div)
        );
    }

    function calculateTime(stamp){
        const date = new Date(stamp);
        const MINUTE = 60,
          HOUR = MINUTE * 60,
          DAY = HOUR * 24,
          YEAR = DAY * 365;

        const secondsAgo = Math.round((+new Date() - date) / 1000);

        if (secondsAgo < MINUTE) {
            return secondsAgo + "s";
        } else if (secondsAgo < HOUR) {
            return Math.floor(secondsAgo / MINUTE) + "m";
        } else if (secondsAgo < DAY) {
            return Math.floor(secondsAgo / HOUR) + "h";
        } else if (secondsAgo < YEAR) {
            return date.toLocaleString("default", { day: "numeric", month: "short" });
        } else {
            return date.toLocaleString("default", { year: "numeric", month: "short" });
        }
    }
    function toggleLikes(in_tweet){
        if(LoginState().isLoggedIn() === false){
            displayLoginModal();
            return;
        }
        Likes(in_tweet).toggle();
        const likeCount = in_tweet.hearts + Likes(in_tweet).get();
        if(likeCount){
            document.getElementById(`${in_tweet.id}-likes`).innerText = likeCount;
        }else{
            document.getElementById(`${in_tweet.id}-likes`).innerText = '';
        }
    }
    function getLikes(in_tweet){
        return Likes(in_tweet).get() + in_tweet.hearts
    }
    function getClassFor(in_tweet){
        let classes = 'heart-counter';
        if(Likes(in_tweet).get()){
            classes += ' liked';
        }
        return classes;
    }
    function getLense(in_tweet){
        if(typeof in_tweet['lense'] !== 'undefined' && in_tweet['lense'] !== null){
            switch(in_tweet['lense']){
                default: return '';
                case 'everyone':
                    return '';
                case 'mention':
                    return (
                        <div className="lense-wrapper">
<svg viewBox="0 0 24 24" aria-hidden="true" className="lense-icon"><g><path d="M17.23 8.6c0-.85-.69-1.55-1.55-1.55-.37 0-.73.14-1.02.39-.6-.45-1.54-.92-2.85-.92-2.97 0-5.12 2.45-5.12 5.84 0 2.62 1.88 4.75 4.19 4.75 1.42 0 2.48-.53 3.17-1.03.54.62 1.53 1.26 3.32 1.26.05 0 5.05-.06 5.05-5.34 0-5.75-4.67-10.42-10.42-10.42S1.58 6.25 1.58 12 6.25 22.42 12 22.42c2.18 0 3.92-.53 5.65-1.72.28-.19.48-.49.56-.86.06-.35-.01-.68-.21-.97-.19-.29-.5-.49-.85-.54-.36-.06-.72.01-.98.19-1.28.88-2.57 1.27-4.17 1.27-4.29 0-7.79-3.5-7.79-7.79S7.71 4.21 12 4.21s7.79 3.5 7.79 7.79c0 2.15-1.19 2.91-2.31 2.91 0 0-.68 0-.98-.35-.15-.17-.19-.45-.13-.82.86-4.96.86-5.06.86-5.14zm-3.5 2.53v.14c0 .73-.22 1.44-.63 2.02-.4.59-.95.91-1.6.94-1 0-1.67-.75-1.71-1.9-.03-.86.26-1.69.81-2.28.42-.45.96-.71 1.51-.73.95 0 1.57.7 1.62 1.81z"></path></g></svg>
                            <span className="desciption">You can reply to this conversation</span>
                        </div>
                    );
                case 'follow':
                    return (
                        <div className="lense-wrapper">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="lense-icon"><g><path d="M14.893 22.5H4.213c-.69 0-1.3-.29-1.72-.82-.44-.56-.6-1.32-.42-2.05.87-3.68 4.25-5.82 8.23-5.82.47 0 .93.03 1.38.09-.11.08-.21.17-.31.26-1.31 1.23-1.37 3.29-.14 4.6l3.06 3.24c.18.19.38.36.6.5zm-4.59-10.42c-1.34 0-2.85-.15-3.81-1.25-.8-.92-1.06-2.35-.79-4.35.37-2.81 2.1-4.48 4.6-4.48 2.51 0 4.23 1.67 4.61 4.48.27 2.01.01 3.43-.8 4.36-.96 1.09-2.46 1.24-3.81 1.24z"></path><path d="M21.893 11.8l-4.22 8.51c-.06.12-.14.23-.24.32-.04.04-.09.08-.14.11-.03.02-.05.04-.08.05-.11.07-.23.11-.35.13-.06.01-.13.02-.2.02-.08 0-.17-.01-.25-.03-.08-.02-.16-.05-.23-.08-.06-.03-.11-.06-.16-.09-.06-.05-.12-.1-.18-.16l-.07-.07-3.02-3.2c-.43-.45-.4-1.18.05-1.6.45-.43 1.17-.41 1.6.04l1.97 2.09 3.49-7.04c.28-.56.96-.8 1.52-.51.55.27.78.96.51 1.51z"></path></g></svg>
                            <span className="desciption">You can reply to this conversation</span>
                        </div>
                    );
            }
        }
        return '';
    }
    function handleTweetOptions(event){
        event.preventDefault();
    }
    function profilePic(tweet){
        const user = tweet.userName.toLowerCase().replace('@','').replace(/[^a-z0-9_]+/,'')
        return `assets/img/users/${user}.jpg`;
    }
    function closeModals(){
        let popup = document.getElementById(FLOATING_PROFILE_DIV);
        if(popup){
            popup.remove();
        }
        //let backdrop = document.getElementById(BACKDROP_ID);
        //if(backdrop){
        //    backdrop.remove();
        //}
    }
    const everyoneSpan = React.useRef();
    const profilePreview = debounce(function(which_tweet,left,top){
		if(currentlyShowing && currentlyShowing.userName === tweet.userName){
			return;
		}
		currentlyShowing = tweet;
		let existing = document.getElementById(FLOATING_PROFILE_DIV);
		if(existing){
			existing.remove();
		}

		let div = document.createElement('div');
		div.id = FLOATING_PROFILE_DIV;

		ReactDOM.render(
			<FloatingProfile left={left} top={top} tweet={which_tweet}/>,
			document.body.appendChild(div)
		);
    },1000);

    const removeProfilePreview = debounce(function(which_tweet){
        closeFloatingProfileDiv();
    },1000);

    return (
    <div className="tweet-container">
        <div className="profile-image-wrapper hover-cursor" onMouseOver={(event) => profilePreview(tweet,event.pageX,event.pageY)} onMouseLeave={() => removeProfilePreview(tweet)}>
            <img src={profilePic(tweet)}/>
        </div>
        <div className="tweet-content hover-cursor">
            <b className="tweet-from" onMouseOver={(event) => profilePreview(tweet,event.pageX,event.pageY)} onMouseLeave={() => removeProfilePreview(tweet)}>
                {tweet.from}
            </b>

            <svg viewBox="0 0 24 24" aria-label="Verified account" className="verified-badge"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>

            <span className="tweet-username" onMouseOver={() => profilePreview(tweet)} onMouseLeave={() => removeProfilePreview(tweet)}>
                {tweet.userName}
            </span>
            <span className="tweet-timestamp"> · {calculateTime(tweet.timeStamp)}</span>
            <span className="tweet-elipses" onClick={handleTweetOptions}>...</span>
            <br/>
            <p className="tweet-body">
                {tweet.body}
            </p>
            <div className="preview-content"></div>
            <div className="tweet-lense">{getLense(tweet)}</div>
            <div className="tweet-footer">
                <div className="blue-hover">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                    {tweet.replyCount > 0 ? tweet.replyCount : ''}
                </div>
                <div className="blue-hover">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                    {tweet.retweets > 0 ? tweet.retweets : ''}
                </div>
                <div className="red-hover" onClick={function(){ toggleLikes(tweet)}}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                    <div className={getClassFor(tweet)} id={`${tweet.id}-likes`}>{getLikes(tweet) > 0 ? getLikes(tweet) : ''}</div>
                </div>
                <div className="blue-hover">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g></svg>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Tweet;
