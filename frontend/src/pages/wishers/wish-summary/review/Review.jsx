import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './review.css';
import redRose from '../../../../assets/img/red-rose.png';

function Review() {

    return (
        <div className='review'>
            <div className="wishFormForSummary">
                <div className="wishFormForSummaryTitle">
                    <span className="wishFormForSummaryTitleText">Make a </span>
                    <span className="wishFormForSummaryTitleWish">Wish</span>
                </div>

                <div className='wishFormForSummaryContainer'>
                    <div className='step4'>
                        <span className='step4Text'>Step 4 of 4</span>
                    </div>

                    <div className='wishFormForSummarySubTitle'>
                        <span className='wishFormForSummarySubTitleText'>Please review items, shipping address, and make a payment:</span>
                    </div>
                </div>

                <div className='reviewContainer'>
                    <div className='reviewImage'>
                        <img className={"redRose"} src={redRose} alt={"Red-Rose.png"} />
                    </div>

                    <div className='reviewItemsAndInfo'>
                        <span className='name'><span className='boldName'>Name: </span>Red Rose Bouquet</span>
                        <span className='quantity'><span className='boldQuantity'>Quantity: </span>1</span>
                        <span className='priceRange'><span className='boldPriceRange'>Price Range: </span>$30 - $70</span>
                        <span className='arrivalDate'><span className='boldArrivalDate'>Arrival Date: </span>Wed, Nov 8</span>
                        <span className='recipientName'><span className='boldRecipientName'>Recipient's Name: </span>Nolan Lwin</span>
                        <span className='recipientPhone'><span className='boldRecipientPhone'>Recipient's Phone Number: </span>272-788-0307</span>
                        <span className='recipientEmail'><span className='boldRecipientEmail'>Recipient's Email Address: </span>nl020@bucknell.edu</span>
                        <span className='recipientAddress'><span className='boldRecipientAddress'>Recipient's Shipping Address: </span>550 1st Ave, New York, NY 10016, USA</span>
                    </div>
                </div>

                <div className='lineBreak'>
                    <hr className='lineBreakForReview' />
                </div>
            </div>
        </div>
    )
}

export default Review;