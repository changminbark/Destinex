import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import IconBellBlack from '../../../assets/svg/icon-bell-black.svg';
import DemoUser from '../../../assets/img/demo-user.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import '../header.css';
import {useAuth} from "../../../networks/hooks/UseAuth";
import { getFullName } from "../../../networks/utils/AuthUtils";

function Header() {
    const [userFullName, setUserFullName] = useState(getFullName);
    const { logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleLogout = () => {
        logout();
    }

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
                        <h5>Hello {userFullName}</h5>
                    </div>
                    <div className="user-browse" onClick={toggleDropdown}>
                        <FontAwesomeIcon icon={faAngleDown} />
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <button onClick={handleLogout}>Log out</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
