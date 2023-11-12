import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import './signup_form_granter.css';

function SignupForm () {
    const [phone, setPhone] = useState('');

    return (
        <div className='signupForm'>

            <div className='signupFormTitle'>
                <span className='signupFormTitleText'>Sign Up to Become a </span>
                <span className='signupFormTitleDestinex'>Granter</span>
            </div>

            <div className='signupFormInput'>
                <div className='postalCode'>
                    <label className='postalCodeText'>Your Postal Code</label>
                    <input type='text' placeholder='Enter your postal code'/>
                </div>

                <div className='contactNumber'>
                    <label className='contactNumberText'>Contact Number</label>
                    <div className="phoneInputContainer">
                        <PhoneInput
                            placeholder="Enter your contact number"
                            value={phone}
                            onChange={setPhone}
                            international
                            defaultCountry="US"
                        />
                    </div>
                </div>

                <div className='automatedSMSText'>
                    <span>
                        Destinex sends automated SMS messages for informational purposes and to provide the service.
                    </span>
                </div>

                <div className='agreement'>
                    <input type='checkbox'/>
                    <span className='agreementText'>
                        Keep me up to date on special offers and other news via SMS messages sent using an autodialer. Consent is not a condition of signing up as a granter.
                    </span>
                </div>

                <div className='stopSMSText'>
                    <span>
                    </span>
                </div>

                <Link to="/granter/setup" className='signupButtonText'>
                    Sign Up
                </Link>
            </div>

        </div>
    )
}

export default SignupForm;