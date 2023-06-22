import React, { useContext, useState } from 'react'
import { ContextPopups } from '../../context/popupsContext'

import classes from './LoginSigninStyles.module.scss';
import '../../styles/globals.scss';

// Login Form popup 

function LoginForm() {

    const { setCurrentPopup, setShowPopup } = useContext(ContextPopups);

    // This state will display error message container depending on boolean value
    const [isError, setIsError] = useState(false);


    // Input states, we want user to be able to login via username or email!
    const [userEmailUsername, setUserEmailUsername] = useState("")
    const [userPassword, setUserPassword] = useState("")

    // Closes login popup when user clicked X icon
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
    function handleEmailUsernameChange(e) {
        let value = e.target.value;
        setUserEmailUsername(value);
    }

    // Handles Password field
    function handlePasswordChange(e) {
        let value = e.target.value;
        setUserPassword(value)
    }

    // When user clicks that already has a account
    function handleSwitchToSignin() {
        setCurrentPopup("SIGNIN_FORM")
    }

    // When user clicks 'Forgot password?'
    function handleSwitchToForgotPassword() {
        setCurrentPopup("FORGOT_PASSWORD_FORM")
    }

    // When user clicks 'continue', then we try to login
    function handleLoginButtonPress() {
        console.log("Login button pressed!")
        console.log(userEmailUsername, userPassword)

        // Test error handler
        if (userEmailUsername === "") setIsError(true)
    }

    return (
        <div onClick={handleClickOutsideLoginForm} className={classes.BlurryContainer}>

            <div className={classes.ContainerWrapper}>

                <div onClick={(e) => e.stopPropagation()} className={classes.Container}>

                    {/* // Close window button */}
                    <i onClick={handleLoginCloseClick} className={"fa-solid fa-xmark " + classes.closeIcon}></i>

                    <h1 className="PopupTitle"> Login </h1>

                    {/* Email Input  */}
                    <p className="inputLabel"> Enter email or username </p>
                    <p className={"control has-icons-left has-icons-right " + classes.myControl}>
                        <input value={userEmailUsername} onChange={(e) => { handleEmailUsernameChange(e) }} className="input" type="email" placeholder="Email" />

                        <span className={"icon is-small is-left " + classes.myIcon}>
                            <i className="fas fa-envelope"></i>
                        </span>
                    </p>


                    {/* Password Input  */}
                    <p className="inputLabel"> Enter password </p>
                    <p className={"control has-icons-left " + classes.myControl}>
                        <input style={{ marginBottom: "0.25rem" }} value={userPassword} onChange={(e) => { handlePasswordChange(e) }} className="input" type="password" placeholder="Password" />
                        <span className={"icon is-small is-left " + classes.myIcon}>
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>

                    {/* Forgot password  */}
                    <span onClick={handleSwitchToForgotPassword} style={{ alignSelf: "flex-start", marginBottom: "0.75rem" }} className='linkText'> Forgot password? </span>

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


                    {/* Login Submit Button  */}
                    <button onClick={handleLoginButtonPress} className='btnFormMaxWidth btnPurple'>
                        Continue
                    </button>

                    <br /> <br />
                    <p className='p4Text text-center'>
                        Don&apos;t have an account yet? <br /><span className='linkText' onClick={handleSwitchToSignin}>Create one</span>
                    </p>

                </div>

            </div>

        </div>
    )
}

export default LoginForm