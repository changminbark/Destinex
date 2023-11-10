import React, {useState} from 'react'
import { Link } from "react-router-dom"
import './signin_form_wisher.css'
import {useAuth} from "../../../../networks/hooks/useAuth";

function SigninForm () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login, error} = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        login(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='signinForm'>
                <div className='signinFormTitle'>
                    <span className='signinFormTitleText'>Sign In to </span>
                    <span className='signupFormTitleDestinex'>Destinex</span>
                </div>

                <div className='signinFormInput'>
                    <div className='email'>
                        <label className='emailText'>Email</label>
                        <input
                            type='email'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter your email address'/>
                    </div>

                    <div className='password'>
                        <label className='passwordText'>Password</label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your password'/>
                        <div className='forgotPassword'> {/* This should be inside the password div */}
                            <span className='forgotPasswordText'>Forgot Password?</span>
                        </div>
                    </div>
                </div>

                <div className='signinButton'>
                    <button type="submit" className='signinButtonText'>Sign In</button>
                    {error && <p className="error">{error}</p>}
                </div>

                <div className='createAccount'>
                    Don’t have an account yet?
                    <Link to="/" className='createAccountSignup'>Sign Up</Link>
                </div>

            </div>
        </form>
    )
}

export default SigninForm;