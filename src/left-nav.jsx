
import NavIcon from './nav-icon.js';

function LeftNav(){
    const [page,setPage] = React.useState(window.location.href.split('#')[1]);
    const isTwitter = () => page === 'twitter';
    const isHome = () => page === 'home';
    const isMessages = () => page === 'messages';
    const isExplore = () =>  page === 'explore';
    const isNotifications = () =>  page === 'notifications';
    const isBookmarks = () =>  page === 'bookmarks';
    const isLists = () => page === 'lists'; 
    const isProfile = () => page === 'profile';
    const isMore = () => page === 'more';
    const isSettings = () => page === 'settings';

    const loggedIn = window.localStorage.getItem('login-state') === 'logged-in';

    React.useEffect(() => {

        console.log('useEffects: ',{page});
        window.location.href='https://fluxkraft-os.net/public/twitter/dist/home.html#' + page;
    });
    return (
        <div className="nav-wrapper">
            <NavIcon loggedIn={loggedIn} type="twitter" clickHandler={setPage} active={isTwitter()}/>
            <NavIcon loggedIn={loggedIn} type="home" clickHandler={setPage} active={isHome()}/>
            <NavIcon loggedIn={loggedIn} type="messages" clickHandler={setPage} active={isMessages()}/>
            <NavIcon loggedIn={loggedIn} type="explore" clickHandler={setPage} active={isExplore()}/>
            <NavIcon loggedIn={loggedIn} type="notifications" clickHandler={setPage} active={isNotifications()}/>
            <NavIcon loggedIn={loggedIn} type="bookmarks" clickHandler={setPage} active={isBookmarks()}/>
            <NavIcon loggedIn={loggedIn} type="lists" clickHandler={setPage} active={isLists()}/>
            <NavIcon loggedIn={loggedIn} type="profile" clickHandler={setPage} active={isProfile()}/>
            <NavIcon loggedIn={loggedIn} type="more" clickHandler={setPage} active={isMore()}/>
            <NavIcon loggedIn={loggedIn} type="settings" clickHandler={setPage} active={isSettings()}/>
        </div>
    );
}

ReactDOM.render(
    <LeftNav/>,
    document.getElementById('left-nav')
);
