import React from 'react';

import IconBellWhite from '../../../assets/svg/icon-bell-white.svg';
import IconBrowseBlack from '../../../assets/svg/icon-browse-black.svg';
import IconHeader from '../../../assets/svg/icon-header.svg';
import IconMenuBlack from '../../../assets/svg/icon-menu-black.svg'
import LogoPurple from '../../../assets/svg/logo-purple.svg';

import DemoUser from '../../../assets/img/demo-user.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import '../header.css';
import {Link} from "react-router-dom";

function Header(props) {
    const { isLogin } = props;

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
                    <div className="divider"></div>
                    <div className="location-text">South Campus Apartment (Building 4)</div> {/* Changed class to className */}
                    <FontAwesomeIcon icon={faAngleDown} />
                </div>
            </div>

            {isLogin ? ( // Changed to a ternary operator for better readability
                <div className="right-sided">
                    <div className="icon-bell">
                        <img src={IconBellWhite} alt="Bell Icon" /> {/* Added alt attribute */}
                    </div>
                    <div className="user-profile">
                        <div className="user-avatar">
                            <img src={DemoUser} alt="User Avatar" /> {/* Added alt attribute */}
                        </div>
                        <div className="username">
                            <h5>Hello Hung</h5>
                        </div>
                        <div className="user-browse">
                            <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="right-sided">
                    <Link to={"/signin"}><button className="sign-in">Sign in</button></Link>
                    <Link to={"/signup"}><button className="sign-up">Sign up</button></Link>
                </div>
            )}
        </div>
    );
}

export default Header;
