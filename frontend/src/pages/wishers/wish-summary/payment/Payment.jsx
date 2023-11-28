import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import './payment.css';
import {addJob} from "../../../../networks/hooks/UseAddWish";

function Payment() {

    const navigate = useNavigate();

    const handleSubmitWish = async (event) => {
        event.preventDefault();

        const category = sessionStorage.getItem("category")
        const receiverName = sessionStorage.getItem("receiverFirstName") + sessionStorage.getItem("receiverLastName")
        const receiverPhone = sessionStorage.getItem("receiverPhone")
        const receiverEmail = sessionStorage.getItem("receiverEmail")
        const receiverAddress = sessionStorage.getItem("receiverAddress")
        const description = sessionStorage.getItem("description")
        const receiverAddressPoint = {
            "type": "Point",
            "coordinates": JSON.parse(sessionStorage.getItem("receiverAddressPoint"))
        }

        const successJobId = await addJob(category, receiverName, receiverPhone, receiverEmail, receiverAddress, description, receiverAddressPoint)
        if (successJobId) {
            navigate(`/wish-success?jobId=${encodeURIComponent(successJobId)}`);
        }
        else {
            console.log("Job creation failed, no ID returned");
        }
    }

    return (
        <form onSubmit={handleSubmitWish}>
            <div className="payment">

                <div className="paymentContainer">

                    <div className="submitButton">
                        <button type={'submit'} className='submitBtn'>
                            Submit
                        </button>
                    </div>

                </div>

            </div>
        </form>

    )
}

export default Payment;