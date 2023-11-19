import React from 'react'
import { Link } from "react-router-dom";
import './signup_form_wisher.css'

function SignupForm () {

    return (
        <div className='signupForm'>
        
            <div className='signupFormTitle'>
                <span className='signupFormTitleText'>Sign Up to </span>
                <span className='signupFormTitleDestinex'>Destinex</span>
            </div>

            <div className='signupFormInput'>
                <div className='nameContainer'>
                    <div className='firstName'>
                        <label className='firstNameText'>First Name</label>
                        <input type='text' placeholder='Enter your first name'/>
                    </div>

                    <div className='lastName'>
                        <label className='lastNameText'>Last Name</label>
                        <input type='text' placeholder='Enter your last name'/>
                    </div>
                </div>

                <div className='email'>
                    <label className='emailText'>Email</label>
                    <input type='email' placeholder='Enter your email address'/>
                </div>

                <div className='password'>
                    <label className='passwordText'>Password</label>
                    <input type='password' placeholder='Enter your password'/>
                </div>

                <div className='agreement'>
                    <input type='checkbox'/>
                    <span className='agreementText'>
                        I agree with Destinex’s <a href="link-to-terms" className="linkStyle">Terms of Services</a>, <a href="link-to-privacy" className="linkStyle">Privacy Policy</a>, and default <a href="link-to-notifications" className="linkStyle">Notification Settings</a>.
                    </span>
                </div>

                <Link to="/signin" className='signupButton'>
                    Sign Up
                </Link>

                <div className='alreadyHaveAccount'>
                    <span className='alreadyHaveAccountText'>Already have an account?</span>
                    <Link to="/signin" className='alreadyHaveAccountLogin'>Sign In</Link>
                </div>
            </div>
            
        </div>
    )
}

export default SignupForm;