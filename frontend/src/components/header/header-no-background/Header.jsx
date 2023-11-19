import React from 'react';
import { Link } from 'react-router-dom';

import IconBellBlack from '../../../assets/svg/icon-bell-black.svg';
import IconBrowseBlack from '../../../assets/svg/icon-browse-black.svg';
import IconHeader from '../../../assets/svg/icon-header.svg';
import IconMenuBlack from '../../../assets/svg/icon-menu-black.svg'
import LogoPurple from '../../../assets/svg/logo-purple.svg';

import DemoUser from '../../../assets/img/demo-user.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import '../header.css';

function Header() {
    return (
        <div className="header">
            <div className="left-sided">
                <div className="icon-menu">
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className="logo">
                    <span className='logo-destinex'>Destinex</span>
                </div>
                <div className="role-option">
                    <Link to={"/wishproduct"}><button className="btn-wish">Wish</button></Link>
                    <Link to={"/granter/signup"}><button className="btn-grant">Grant</button></Link>
                </div>
                <div className="location">
                    <div class="divider"></div>
                    <div class="location">South Campus Apartment (Building 4)</div>
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
            </div>
            <div className="right-sided">
                <div className="icon-bell">
                    <img src={IconBellBlack} />
                </div>
                <div className="user-profile">
                    <div className="user-avatar">
                        <img src={DemoUser} />
                    </div>
                    <div className="username">
                        <h5>Hello Hung</h5>
                    </div>
                    <div className="user-browse">
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
