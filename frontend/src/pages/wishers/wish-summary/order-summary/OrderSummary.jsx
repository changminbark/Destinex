import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './order_summary.css';

function OrderSummary() {

    return (
        <div className="orderSummary">

            <div className="orderSummaryContainer">

                <div className='orderSummarySubTitle'>
                    <span className='orderSummarySubTitleText'>Order Summary:</span>
                </div>

                <div className='itemsAndShippingCost'>
                    <span className='items'><span className='boldItems'>Items: </span>$30 - $70</span>
                    <span className='shippingCost'><span className='boldShippingCost'>Shipping & Handling: </span>$15</span>
                </div>

                <div className='lineBreak'>
                    <hr className='lineBreakForItemsAndShippingCost' />
                </div>

                <div className='totalBeforeTaxAndEstimatedTaxCollected'>
                    <span className='totalBeforeTax'><span className='boldTotalBeforeTax'>Total before tax: </span>$45 - $85</span>
                    <span className='estimatedTaxCollected'><span className='boldEstimatedTaxCollected'>Estimated tax to be collected: </span>$8.5</span>
                </div>

                <div className='lineBreak'>
                    <hr className='lineBreakForTotalBeforeTaxAndEstimatedTaxCollected' />
                </div>

                <div className='orderTotal'>
                    <span className='orderTotalText'><span className='boldOrderTotalText'>Order Total: </span>$53.5 - $93.5</span>
                </div>

            </div>

            <div className='lineBreak'>
                <hr className='lineBreakForOrderSummary' />
            </div>

        </div>
    )
}

export default OrderSummary;