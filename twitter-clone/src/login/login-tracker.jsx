
function LoginState(){
    const LOGIN_STATE = 'login-state';
    return {
        get: function () { return window.localStorage.getItem(LOGIN_STATE); },
        set: function(s) { window.localStorage.setItem(LOGIN_STATE,s); },
        isLoggedIn: function(){ return window.localStorage.getItem(LOGIN_STATE) === 'logged-in'; },
    };
}
function LoginTracker(){
    const logoutButton = React.useRef();
    const [loginState,setLoginState] = React.useState(LoginState().get())
    const [page,setPageTo] = React.useState(null)
    React.useEffect(() => {
        LoginState().set(loginState);
        if(['login','signup'].indexOf(page) > -1){
            window.location.href='/clones/index.html';
        }
    });
    if(LoginState().isLoggedIn() === false){
        document.getElementById('navigation-echo').classList.add('hidden');
        return (
            <div className="fixed-login-banner">
                <div></div>
                <div className="dont-miss">
                    <div className="dm-top">
                        <b>Don't miss what's happening</b>
                    </div>
                    <div className="dm-bottom">
                        People on Twitter are the first to know.
                    </div>
                </div>
                <div className="buttons">
                        <button className="login" onClick={() => setPageTo('login')}>Log in</button>
                        <button className="sign-up" onClick={() => setPageTo('signup')}>Sign up</button>
                </div>
            </div>
        );
    }
    return (
        <div className="fixed-login-banner">Logged in <button onClick={function(){ setLoginState('logged-out'); window.location.reload(); }}>Click here to log out</button></div>
    );
}

export default LoginState;

ReactDOM.render(
    <LoginTracker/>,
    document.getElementById('login-tracker')
);

