function Login(){
    const LOGIN_STATE = 'login-state';
    for(let link of document.querySelectorAll('.login-mechanism')){
        link.onclick = function(event){
            event.preventDefault();
            window.localStorage.setItem(LOGIN_STATE,'logged-in');
            window.location.href = 'home.html';
        };
    }
}
window.onload = Login
