import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import './wish_form_recipient.css';
import {TextField} from "@material-ui/core";

function WishFormRecipient() {
    // Might not need these until last page?
    const [receiverFirstName, setReceiverFirstName] = useState('');
    const [receiverLastName, setReceiverLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [firstAddress, setFirstAddress] = useState('');
    const [secondAddress, setSecondAddress] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [address, setAddress] = useState('');

    const handleFirstNameChange = (event) => {
        // Might not need this until last page if using sessionStorage
        setReceiverFirstName(event.target.value)
        sessionStorage.setItem("receiverFirstName", receiverFirstName)
    }

    const handleLastNameChange = (event) => {
        // Might not need this until last page if using sessionStorage
        setReceiverLastName(event.target.value)
        sessionStorage.setItem("receiverLastName", receiverLastName)
    }

    const handleContactChange = (event) => {
        // Might not need this until last page if using sessionStorage
        setPhone(event.target.value)
        sessionStorage.setItem("receiverPhone", phone)
    }

    const handleEmailChange = (event) => {
        // Might not need this until last page if using sessionStorage
        setEmail(event.target.value)
        sessionStorage.setItem("receiverEmail", email)
    }

    const handleAddressChange = () => {
        // Might not need this until last page if using sessionStorage
        const adrs = {FirstAddress: firstAddress, SecondAddress: secondAddress,
            City: city, Region: region, Country: country, Zip: zip}
        const adrsJSON = JSON.stringify(adrs)

        // setAddress(firstAddress + secondAddress + ", " + city +
        //     ", " + region + ", " + country + ", " + zip)

        setAddress(adrsJSON)

        sessionStorage.setItem("receiverAddress", adrsJSON)
    }

    return (
        <div className="wishFormForRecipient">
            <div className="wishFormForRecipientTitle">
                <span className="wishFormForRecipientTitleText">Make a </span>
                <span className="wishFormForRecipientTitleWish">Wish</span>
            </div>

            <div className='wishFormForRecipientContainer'>
                <div className='step2'>
                    <span className='step2Text'>Step 2 of 4</span>
                </div>

                <div className='wishFormForRecipientSubTitle'>
                    <span className='wishFormForRecipientSubTitleText'>Please provide the details of the person who will be receiving your shipment:</span>
                </div>

                <div className='recipientNameContainer'>
                    <div className='firstName'>
                        <label className='firstNameText'>Recipient's First Name</label>
                        <input className='firstNameInput' type='text'
                           onChange={handleFirstNameChange}
                        />
                    </div>

                    <div className='lastName'>
                        <label className='lastNameText'>Recipient's Last Name</label>
                        <input className='lastNameInput' type='text'
                            onChange={handleLastNameChange}
                        />
                    </div>
                </div>

                <div className='contactAndEmailContainer'>
                    <div className='contactNumber'>
                        <label className='contactNumberText'>Recipient's Phone Number</label>
                        <div className="contactNumberInputContainer">
                            <input
                                value={phone}
                                onChange={handleContactChange}
                                // international
                                // defaultCountry="US"
                            />
                        </div>
                    </div>

                    <div className='emailAddress'>
                        <label className='emailAddressText'>Recipient's Email Address</label>
                        <input className='emailAddressInput' type='email'
                            onChange={handleEmailChange}
                        />
                    </div>
                </div>

                <div className='firstAddress'>
                    <label className='firstAddressText'>Recipient's Address</label>
                    <input className='firstAddressInput' type='text'
                        onChange={(val) => setFirstAddress(val)}
                    />
                </div>

                <div className='secondAddress'>
                    <label className='secondAddressText'>Apartment, suite, etc.</label>
                    <input className='secondAddressInput' type='text'
                       onChange={(val) => setSecondAddress(val)}
                    />
                </div>


                <div className='recipientCountry'>
                    <label className='recipientCountryText'>Country</label>
                    <CountryDropdown
                        value={country}
                        onChange={(val) => setCountry(val)}
                        id="country"
                        classes="dropdownClass" // apply your custom styles here
                    />
                </div>

                <div className='recipientState'>
                    <label className='recipientStateText'>State</label>
                    <RegionDropdown
                        country={country}
                        value={region}
                        onChange={(val) => setRegion(val)}
                        id="state"
                        classes="dropdownClass" // apply your custom styles here
                        disableWhenEmpty={true}
                    />
                </div>

                <div className='cityAndZipCode'>
                    <div className='recipientCity'>
                        <label className='recipientCityText'>City</label>
                        <input className='recipientCityInput' type='text'
                           onChange={(val) => setCity(val)}
                        />
                    </div>

                    <div className='recipientZipCode'>
                        <label className='recipientZipCodeText'>ZIP/Postal Code</label>
                        <input className='recipientZipCodeInput' type='text'
                               onChange={(val) => setZip(val)}
                        />
                    </div>
                </div>

                <div className='backAndNextButtons'>
                    <Link to='/wish-product' className='backButton'>
                        Back
                    </Link>
                    <Link to='/wish-additional' className='nextButton' onClick={handleAddressChange}>
                        Next
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WishFormRecipient;