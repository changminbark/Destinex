import React from "react";
import "./footer.css"

import Appstore_Icon from "../../assets/svg/appstore_icon.svg"
import Facebook_Icon from "../../assets/svg/facebook_icon.svg"
import Instagram_Icon from "../../assets/svg/instagram_icon.svg"
import Linkedin_Icon from "../../assets/svg/linkedin_icon.svg"
import X_Icon from "../../assets/svg/x_icon.svg"
import Youtube_Icon from "../../assets/svg/youtube_icon.svg"

function Footer() {
    return (
        <div className={"bottom"}>
            <div className={"bottomTitle"}>
                <span className={"bottomTitleText"}>Destinex</span>
            </div>
            <div className={"bottomLinksContainer"}>
                <img className={"Appstore_Logo"} src={Appstore_Icon} alt={"Appstore Logo"} />
                <div className={"bottomLinks"}>
                    <div className={"bottomLinksTextBox"}>
                        <span className={"bottomLinksText"}>About Destinex</span>
                        <span className={"bottomLinksText"}>Our Portfolio</span>
                        <span className={"bottomLinksText"}>Careers</span>
                        <span className={"bottomLinksText"}>Contact</span>
                        <span className={"bottomLinksText"}>Help Center</span>
                    </div>
                    <div className={"bottomLinksTextBox"}>
                        <span className={"bottomLinksText"}>Sign up to grant</span>
                        <span className={"bottomLinksText"}>Privacy Policy</span>
                        <span className={"bottomLinksText"}>Terms and Conditions</span>
                    </div>
                </div>
            </div>
            <div className={"bottomSocMed"}>
                <span className={"bottomSocMedFollowText"}>Follow Destinex</span>
                <img className={"bottomSocMedLogo"} src={Facebook_Icon} alt={"Facebook Logo"} />
                <img className={"bottomSocMedLogo"} src={Instagram_Icon} alt={"Instagram Logo"} />
                <img className={"bottomSocMedLogo"} src={Linkedin_Icon} alt={"Linkedin Logo"} />
                <img className={"bottomSocMedLogo"} src={X_Icon} alt={"X Logo"} />
                <img className={"bottomSocMedLogo"} src={Youtube_Icon} alt={"Youtube Logo"} />
            </div>
            <div className={"bottomCopyright"}>
                <span className={"bottomCopyrightText"}>@2023 Destinex. All Rights Reserved.</span>
            </div>
        </div>
    )
}

export default Footer