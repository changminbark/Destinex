import BrowseIcon from '../../resources/svg/icon-browse.svg';
import BellIcon from '../../resources/svg/icon-bell.svg';

import UserAvatar from '../../resources/images/user-avatar.png';

function Header() {
    return (
        <div className={header}>
            <div className="btn-menu">
                <img src="../../resources/images/icon-menu.png" alt=""/>
            </div>
            <div className="logo">
                <img src="../../resources/images/logo-purple.png" alt="Logo"/>
            </div>
            <div className="btn-role">
                <button>Wish</button>
                <button>Grant</button>
            </div>
            <div className="divider"></div>
            <div className="header-location">
                <div className="location-name">South Campus Apartment (Building 4)</div>
                <div className="icon-browse">
                    <img src={BrowseIcon} alt="Browse Icon"/>
                </div>
            </div>
            <div className="btn-notification">
                <img src={BellIcon} alt="Bell Icon"/>
            </div>
            <div className="user-profile">
                <div className="user-photo">
                    <img src={UserAvatar} alt=""/>
                </div>
                <div className="display-name">
                    <p>Hello Hung</p>
                </div>
                <div className="icon-browse">
                    <img src={BrowseIcon} alt=""/>
                </div>
            </div>
        </div>
    )
}