import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './payment.css';

function Payment() {

    return (
        <div className="payment">

            <div className="paymentContainer">

                <div className="submitButton">
                    <Link to='/' className='submit'>
                        Submit
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default Payment;