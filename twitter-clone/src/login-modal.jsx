const POPUP_ID = 'tweet-login-popup';
const BACKDROP_ID = 'tweet-login-backdrop';
const MODAL_WRAPPER_ID = 'login-modal-wrapper';
function LoginPrompter({wrapperId}){
    function dismiss(){
        document.getElementById(MODAL_WRAPPER_ID).remove();
    }
    function gotoLogin(){
        window.location.href= '/clones/index.html';
    }
    return (
    <div className="login-popup">
        <h1 onClick={dismiss}>X</h1>
        <div className="heart">
<svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path></g></svg>
        </div>
        <div className="login-cta">
            <h3>Like a tweet to share the love</h3>
            <p className="cta">
                Join Twitter now to let William Merfalen know you like their Tweet.
            </p>
        </div>
        <div className="login-wrapper">
            <div className="container">
                <button className="login" onClick={gotoLogin}>Log in</button>
            </div>
            <div className="container">
                <button className="sign-up" onClick={gotoLogin}>Sign up</button>
            </div>
        </div>
    </div>
    );
}
function LoginModal(){

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
        <div>
            <LoginPrompter wrapperId={POPUP_ID}/>
        </div>
    );
}
export default LoginModal;
