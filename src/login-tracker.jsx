
function LoginTracker(){
    const LOGIN_STATE = 'login-state';
    const [loginState,setLoginState] = React.useState(window.localStorage.getItem(LOGIN_STATE) || 'logged-out');
    React.useEffect(() => {
        setLoginState(loginState);
    });
    if(loginState !== 'logged-in'){
        window.location.href = '/public/twitter/dist';
        return (<div></div>);
    }
    return (
        <div>Logged in</div>
    );
}
ReactDOM.render(
    <LoginTracker/>,
    document.getElementById('login-tracker')
);
