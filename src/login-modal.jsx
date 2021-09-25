const POPUP_ID = 'tweet-login-popup';
const BACKDROP_ID = 'tweet-login-backdrop';
function FloatingVisibilityBox({wrapperId}){
    const floatingStyle = {
        left: '0px',
        top: '0px',
        position: 'absolute',
    };
    return (
    <div className="login-popup" style={floatingStyle}>
        <h1>X</h1>
        <div>Heart</div>
        <h3>Like a tweet to share the love</h3>
        <p className="description">
            Join Twitter now to let William Merfalen know you like their Tweet.
        </p>
        <div className="selection" onClick={() => setVisibility('everyone')}>
            <div>
                <button className="login">Log in</button>
            </div>
            <div>
                <button className="sign-up">Sign up</button>
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
        </div>
    );
}
export default LoginModal;
