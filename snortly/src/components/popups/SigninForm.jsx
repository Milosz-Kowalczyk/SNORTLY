import React, { useContext, useState } from 'react'
import { ContextPopups } from '../../context/popupsContext'

import classes from './LoginSigninStyles.module.scss';
import '../../styles/globals.scss';

// Sign in popup

function SigninForm() {

    const { setCurrentPopup, setShowPopup } = useContext(ContextPopups)

    // This state will display error message container depending on boolean value
    const [isError, setIsError] = useState(false);


    // Input states, we want user to be able to login via username or email!
    const [userUsername, setUserUsername] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

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
    function handleUsernameChange(e) {
        let value = e.target.value;
        setUserUsername(value);
    }

    // Handles email or username input field
    function handleEmailChange(e) {
        let value = e.target.value;
        setUserEmail(value);
    }

    // Handles Password field
    function handlePasswordChange(e) {
        let value = e.target.value;
        setUserPassword(value)
    }

    // When user clicks that already has a account
    function handleSwitchToLogin() {
        setCurrentPopup("LOGIN_FORM")
    }

    // When user clicks on signin button
    function handleSigninButtonPress() {
        console.log("Sign in button pressed!")
        console.log(userUsername, userEmail, userPassword)

        // Test error handler
        if (userEmail === "") setIsError(true)
    }

    return (
        <div onClick={handleClickOutsideLoginForm} className={classes.BlurryContainer}>

            <div className={classes.ContainerWrapper}>

                <div onClick={(e) => e.stopPropagation()} className={classes.Container}>

                    {/* // Close window button */}
                    <i onClick={handleLoginCloseClick} className={"fa-solid fa-xmark " + classes.closeIcon}></i>

                    <h1 className="PopupTitle"> Join us </h1>

                    {/* Username Input  */}
                    <p className="inputLabel"> Enter username </p>
                    <p className={"control has-icons-left has-icons-right " + classes.myControl}>
                        <input value={userUsername} onChange={(e) => { handleUsernameChange(e) }} className="input" type="email" placeholder="Email" />

                        <span className={"icon is-small is-left " + classes.myIcon}>
                            <i className="fa-solid fa-user"></i>
                        </span>
                    </p>

                    {/* Email Input  */}
                    <p className="inputLabel"> Enter email </p>
                    <p className={"control has-icons-left has-icons-right " + classes.myControl}>
                        <input value={userEmail} onChange={(e) => { handleEmailChange(e) }} className="input" type="email" placeholder="Email" />

                        <span className={"icon is-small is-left " + classes.myIcon}>
                            <i className="fas fa-envelope"></i>
                        </span>
                    </p>


                    {/* Password Input  */}
                    <p className="inputLabel"> Enter password </p>
                    <p className={"control has-icons-left " + classes.myControl}>
                        <input value={userPassword} onChange={(e) => { handlePasswordChange(e) }} className="input" type="password" placeholder="Password" />
                        <span className={"icon is-small is-left " + classes.myIcon}>
                            <i className="fas fa-lock"></i>
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

                    {/* Login Submit Button  */}
                    <button onClick={handleSigninButtonPress} className='btnFormMaxWidth btnPurple'>
                        Continue
                    </button>


                    <br /> <br />
                    <p className='p4Text text-center'>
                        Already have an account? <br /><span onClick={handleSwitchToLogin} className='linkText'>Log in</span>
                    </p>

                </div>

            </div>

        </div>
    )
}

export default SigninForm