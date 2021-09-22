
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


    React.useEffect(() => {

        console.log('useEffects: ',{page});
        window.location.href='https://fluxkraft-os.net/public/twitter/dist/home.html#' + page;
    });
    return (
        <div className="nav-wrapper">
            <NavIcon type="twitter" clickHandler={setPage} active={isTwitter()}/>
            <NavIcon type="home" clickHandler={setPage} active={isHome()}/>
            <NavIcon type="messages" clickHandler={setPage} active={isMessages()}/>
            <NavIcon type="explore" clickHandler={setPage} active={isExplore()}/>
            <NavIcon type="notifications" clickHandler={setPage} active={isNotifications()}/>
            <NavIcon type="bookmarks" clickHandler={setPage} active={isBookmarks()}/>
            <NavIcon type="lists" clickHandler={setPage} active={isLists()}/>
            <NavIcon type="profile" clickHandler={setPage} active={isProfile()}/>
            <NavIcon type="more" clickHandler={setPage} active={isMore()}/>
        </div>
    );
}

ReactDOM.render(
    <LeftNav/>,
    document.getElementById('left-nav')
);
