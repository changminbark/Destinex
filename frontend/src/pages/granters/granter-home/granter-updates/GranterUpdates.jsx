import React from 'react';
import { Link } from "react-router-dom";
import './granter_updates.css';
import redRose from '../../../../assets/img/red-rose.png';
import dollarSign from '../../../../assets/svg/dollar-sign.svg';
import direction from '../../../../assets/svg/direction.svg';
import calendar from '../../../../assets/svg/calendar.svg';

function GranterUpdates () {

    return (
        <div className='granterUpdates'>
            <div className='granterUpdatesTitle'>
                <span className='granterUpdatesTitleView'>View </span>
                <span className='granterUpdatesTitleWishes'>Wishes </span>
                <span className='granterUpdatesTitleText'>Near You</span>
            </div>

            <div className='wishBoxContainer'>
                <div className='wishBoxContainerLeft'>
                    <div className='viewImageContainer'>
                        <img className="viewImage" src={redRose} alt={"Red-Rose.png"} />
                    </div>

                    <div className='generalWishInformation'>
                        <span className='generalWishInformationTitle'>Buy Red Rose Bouquet</span>

                        <div className='guaranteedAmountContainer'>
                            <img className='dollarSign' src={dollarSign} alt='Dollar Sign Icon' />
                            <span className='guaranteedAmount'>$8.00 Guaranteed</span>
                        </div>

                        <div className='estimatedMilesContainer'>
                            <img className='direction' src={direction} alt='Direction Icon' />
                            <span className='estimatedMiles'>2.7 mi Estimated</span>
                        </div>

                        <div className='estimatedTimeToBeDeliveredContainer'>
                            <img className='calendar' src={calendar} alt='Calendar Icon' />
                            <span className='estimatedTimeToBeDelivered'>Deliver by 5:00 PM on Dec 25</span>
                        </div>
                    </div>
                </div>

                <div className='wishBoxContainerRight'>
                    <div className='wishBoxContainerRightUp'>
                        <Link to='' className='acceptButton'>
                            Accept
                        </Link>
                    </div>
                    <div className='wishBoxContainerRightDown'>
                        <Link to='' className='declineButton'>
                            Decline
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default GranterUpdates;