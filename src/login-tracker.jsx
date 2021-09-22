
function LoginTracker(){
    const LOGIN_STATE = 'login-state';
    const logoutButton = React.useRef();
    const [loginState,setLoginState] = React.useState(window.localStorage.getItem(LOGIN_STATE) || 'logged-out');
    React.useEffect(() => {
        window.localStorage.setItem(LOGIN_STATE,loginState);
    });
    if(loginState !== 'logged-in'){
        window.location.href = '/public/twitter/dist';
        return (<div></div>);
    }
    return (
        <div>Logged in <button onClick={() => setLoginState('logged-out')}>Click here to log out</button></div>
    );
}
ReactDOM.render(
    <LoginTracker/>,
    document.getElementById('login-tracker')
);
