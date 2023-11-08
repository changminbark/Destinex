import React from 'react'
import { Link } from "react-router-dom"
import './signin_form.css'

function SigninForm () {

    return (
        <div className='signinForm'>
            
            <div className='signinFormTitle'>
                <span className='signinFormTitleText'>Sign In to </span>
                <span className='signupFormTitleDestinex'>Destinex</span>
            </div>

            <div className='signinFormInput'>
                <div className='email'>
                    <label className='emailText'>Email</label>
                    <input type='email' placeholder='Enter your email address'/>
                </div>

                <div className='password'>
                    <label className='passwordText'>Password</label>
                        <input type='password' placeholder='Enter your password'/>
                    <div className='forgotPassword'> {/* This should be inside the password div */}
                        <span className='forgotPasswordText'>Forgot Password?</span>
                    </div>
                </div>
            </div>

            <div className='signinButton'>
                <button className='signinButtonText'>Sign In</button>
            </div>

            <div className='createAccount'>
                Don’t have an account yet?
                <Link to="/" className='createAccountSignup'>Sign Un</Link>
            </div>
        
        </div>
    )
}

export default SigninForm;