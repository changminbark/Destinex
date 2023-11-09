import { IconBell } from '../../assets/svg/icon-bell.svg';
import { IconBrowse } from '../../assets/svg/icon-browse.svg';
import { IconHeader } from '../../assets/svg/icon-header.svg';
import { IconMenu } from '../../assets/svg/'
import { Logo } from '../../assets/svg/logo.svg';

import { DemoUser } from '../../assets/img/demo-user.png';

function Header() {
    return (
        <div className="header-container">
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
            <div class="divider"></div>
        </div>
    );
}

export default Header;