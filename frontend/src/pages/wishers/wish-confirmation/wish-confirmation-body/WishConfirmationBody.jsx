import React, { useState } from 'react';
import {Link} from "react-router-dom";
import './WishConfirmationBody.css';
import Delivery_pic from "../../../../assets/img/delivery-proof.jpg"

function WishConfirmationBody () {

    const handleSubmitConfirmation = async (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmitConfirmation}>
            <div className={'wishConfirmBody'}>
                <div className={'wishConfirmTitleBox'}>
                    <div className={'wishConfirmTitle'}>
                        <span className={'wishConfirmTitleOne'}>Wish&nbsp;</span>
                        <span className={'wishConfirmTitleTwo'}>Status&nbsp;</span>
                    </div>
                </div>
                <div className={'wishConfirmBoxContainer'}>
                    <div className={'wishConfirmBox'}>
                        <span className={'wishConfirmBoxTitle'}>Status</span>
                    </div>
                    <div className={'wishConfirmBox'}>
                        <span className={'wishConfirmBoxDesc'}>You wish has been granted.</span>
                    </div>
                </div>
                <div className={'wishConfirmBoxContainer'}>
                    <div className={'wishConfirmBox'}>
                        <span className={'wishConfirmBoxTitle'}>Delivered Address</span>
                    </div>
                    <div className={'wishConfirmBox'}>
                        <span className={'wishConfirmBoxDesc'}>550 1st Ave, New York, NY 10016, USA</span>
                    </div>
                </div>
                <div className={'wishConfirmBoxContainer'}>
                    <div className={'wishConfirmBox'}>
                        <span className={'wishConfirmBoxTitle'}>Actual Delivery</span>
                    </div>
                    <div className={'wishConfirmBox'}>
                        <span className={'wishConfirmBoxDesc'}>Wed, Nov 8, 2023, at 4:30 PM</span>
                    </div>
                </div>
                <div className={'wishConfirmBoxContainer'}>
                    <div className={'wishConfirmBox'}>
                        <span className={'wishConfirmBoxTitle'}>Proof of Delivery</span>
                    </div>
                    <div className={'wishConfirmBox'}>
                        <img className={'Delivery_pic'} src={Delivery_pic} alt={'Delivery_pic'}/>
                    </div>
                </div>
                <div className={'wishConfirmBoxContainer'}>
                    <div className={'wishConfirmBox'}>
                        <span className={'wishConfirmBoxTitle'}>How was the service provided by our Granter?</span>
                    </div>
                    <div className={'wishConfirmBox'}>
                        <div className="rating">
                            <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5"></label>
                            <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4"></label>
                            <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3"></label>
                            <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2"></label>
                            <input type="radio" id="star1" name="rating" value="1" /><label for="star1"></label>
                        </div>
                    </div>
                </div>
                <div className={'wishConfirmBoxContainer'}>
                    <div className={'wishConfirmBox'}>
                        <span className={'wishConfirmBoxDesc'}>Any feedback? (Optional)</span>
                    </div>
                    <div className={'wishConfirmBox'}>
                        <input className={'feedbackInput'}/>
                    </div>
                </div>
                <div className={'bottomBox'}>
                    <div className="submitButton">
                        <button type={'submit'} className='submitBtn'>
                            Confirm
                        </button>
                    </div>
                    <div className={'missingItemBox'}>
                        <Link to={''} className={'missingItemLink'}>Missing Items?</Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default WishConfirmationBody;