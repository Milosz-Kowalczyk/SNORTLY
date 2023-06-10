import React, { useContext, useState } from 'react'
import { ContextPopups } from '../../context/popupsContext'

import classes from './LoginSigninStyles.module.scss';
import '../../styles/globals.scss';

function ForgotPasswordForm() {

    const { setCurrentPopup, setShowPopup } = useContext(ContextPopups);

    // This state will display error message container depending on boolean value
    const [isError, setIsError] = useState(false);

    // Input states, we want user to be able to login via username or email!
    const [userEmail, setUserEmail] = useState("")

    // Closes login popup
    function handleLoginCloseClick() {
        setCurrentPopup("")
        setShowPopup(false);
    }

    // When user clicks on blurry part of the website (not on form) or close button
    function handleClickOutsideLoginForm() {
        setCurrentPopup("")
        setShowPopup(false);
    }

    // Handles email or username input field
    function handleEmailChange(e) {
        let value = e.target.value;
        setUserEmail(value);
    }

    // When user clicks that already has a account
    function handleSwitchToSignin() {
        setCurrentPopup("SIGNIN_FORM")
    }

    // When user clicks 'continue', then we try to login
    function handleLoginButtonPress() {
        console.log("Forgot button pressed!")
        console.log(userEmail)

        // Test error handler
        if (userEmail === "") setIsError(true)
    }

    return (
        <div onClick={handleClickOutsideLoginForm} className={classes.BlurryContainer}>

            <div className={classes.ContainerWrapper}>

                <div onClick={(e) => e.stopPropagation()} className={classes.Container}>

                    {/* // Close window button */}
                    <i onClick={handleLoginCloseClick} className={"fa-solid fa-xmark " + classes.closeIcon}></i>

                    <h1 style={{ marginBottom: "0.5rem", textAlign: "left" }} className="PopupTitle"> Reset password </h1>
                    <p className='textGray-medium'> Enter the email address associated with your account and we&apos;ll send you a link to reset your password</p>

                    {/* Email Input  */}
                    <p style={{ marginTop: '1.5rem' }} className="inputLabel"> Enter email </p>
                    <p className={"control has-icons-left has-icons-right " + classes.myControl}>
                        <input value={userEmail} onChange={(e) => { handleEmailChange(e) }} className="input" type="email" placeholder="Email" />

                        <span className={"icon is-small is-left " + classes.myIcon}>
                            <i className="fas fa-envelope"></i>
                        </span>
                    </p>

                    {/* Error Message  */}
                    {
                        (isError) &&
                        <div className='errorMessageContainer'>
                            <p className='errorMessageText'>
                                - Incorect password <br />
                                - User not found
                            </p>
                        </div>
                    }


                    {/* Reset Password submit Button  */}
                    <button onClick={handleLoginButtonPress} className='btnFormMaxWidth btnPurple'>
                        Continue
                    </button>

                    <br /> <br />
                    <p className='textGray-medium text-center'>
                        Don&apos;t have an account yet? <br /><span className='linkText' onClick={handleSwitchToSignin}>Create one</span>
                    </p>

                </div>

            </div>

        </div>
    )
}

export default ForgotPasswordForm