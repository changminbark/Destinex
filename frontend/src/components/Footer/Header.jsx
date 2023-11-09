import { IconBell } from '../../assets/svg/icon-bell.svg';
import { IconBrowse } from '../../assets/svg/icon-browse.svg';
import { IconHeader } from '../../assets/svg/icon-header.svg';
import { IconMenu } from '../../assets/svg/'
import { Logo } from '../../assets/svg/logo.svg';

import { DemoUser } from '../../assets/img/demo-user.png';

function Header() {
    return (
        <div className="header">
            <div className="icon-menu">
                <img src={IconMenu} />
            </div>
            <div className="logo">
                <img src={Logo} />
            </div>
            <div class="role-option">
                <button>Wish</button>
                <button>Grant</button>
            </div>
            <div class="location">
                <div class="divider"></div>
                <div class="location">South Campus Apartment (Building 4)</div>
            </div>
            <div class="icon-bell">
                <img src={IconBell} />
            </div>
            <div class="user-profile">
                <div class="user-avatar">
                    <img src={DemoUser} />
                </div>
                <div class="username">
                    <p>Hello Hung</p>
                </div>
                <div class="user-browse">
                    <img src={IconBrowse}>
                </div>
            </div>
        </div>
    );
}

export default Header;