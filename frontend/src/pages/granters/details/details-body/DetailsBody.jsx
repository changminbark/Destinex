import React, { useState } from 'react';
import './DetailsBody.css';
import Hourglass_icon from "../../../../assets/img/Hourglass.png"
import {Link} from "react-router-dom";
import Red_Rose from "../../../../assets/img/red-rose.png"

function DetailsBody () {

    return (
        <div className='detailsBody'>
            <div className={'detailsTitle'}>
                <span className={'detailsTitleTextOne'}>Wish&nbsp;</span>
                <span className={'detailsTitleTextTwo'}>Details</span>
            </div>
            <div className={'detailsContent'}>
                <div className={'detailsContentBox'}>
                    <span className={'detailsContentTitle'}>Wish:&nbsp; </span>
                    <span className={'detailsContentTitle'}>WORK ON THIS LATER USING SESSION STORAGE</span>
                </div>
                <div className={'detailsContentBox'}>
                    <span className={'detailsContentTitle'}>Product Information:</span>
                </div>
                <div className={'detailsContentBox'}>
                    <img className={'Red_Rose'} src={Red_Rose} alt={"Red_Rose"}/>
                    <div className={'detailsSub'}>
                        <div className={'detailsSubBox'}>
                            <span className={'detailsSubTitle'}>Name: </span>
                            <span className={'detailsSubDesc'}>WORK USING SESSION STORAGE</span>
                        </div>
                        <div className={'detailsSubBox'}>
                            <span className={'detailsSubTitle'}>Quantity: </span>
                            <span className={'detailsSubDesc'}>WORK USING SESSION STORAGE</span>
                        </div>
                        <div className={'detailsSubBox'}>
                            <span className={'detailsSubTitle'}>Price Range: </span>
                            <span className={'detailsSubDesc'}>WORK USING SESSION STORAGE</span>
                        </div>
                        <div className={'detailsSubBox'}>
                            <span className={'detailsSubTitle'}>Arrival Date: </span>
                            <span className={'detailsSubDesc'}>WORK USING SESSION STORAGE</span>
                        </div>
                    </div>
                </div>
                <div className={'detailsContentBox'}>
                    <span className={'detailsContentTitle'}>Delivery Instructions/Notes:</span>
                </div>
                <div className={'detailsContentBox'}>
                    <span className={'detailsSubDesc'}>WORK USING SESSION STORAGE</span>
                </div>
                <div className={'detailsContentBox'}>
                    <span className={'detailsContentTitle'}>Recipient’s Information:</span>
                </div>
                <div className={'detailsContentBox'}>
                    <div className={'detailsSub'}>
                        <div className={'detailsSubBox'}>
                            <span className={'detailsSubTitle'}>Recipient's Name: </span>
                            <span className={'detailsSubDesc'}>WORK USING SESSION STORAGE</span>
                        </div>
                        <div className={'detailsSubBox'}>
                            <span className={'detailsSubTitle'}>Recipient's Phone Number: </span>
                            <span className={'detailsSubDesc'}>WORK USING SESSION STORAGE</span>
                        </div>
                        <div className={'detailsSubBox'}>
                            <span className={'detailsSubTitle'}>Recipient's Email: </span>
                            <span className={'detailsSubDesc'}>WORK USING SESSION STORAGE</span>
                        </div>
                        <div className={'detailsSubBox'}>
                            <span className={'detailsSubTitle'}>Recipient's Shipping Address: </span>
                            <span className={'detailsSubDesc'}>WORK USING SESSION STORAGE</span>
                        </div>
                    </div>
                </div>
            </div>

            <Link to={"/granter/wish-granted"} className={"completeToGranted"}>Complete</Link>
        </div>
    )
}

export default DetailsBody;