import React, { useContext } from 'react'
import classes from './LoginForm.module.scss'
import { ContextPopups } from '../../context/popupsContext'


function LoginForm() {

    const { setCurrentPopup, setShowPopup } = useContext(ContextPopups)

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

    return (
        <div onClick={handleClickOutsideLoginForm} className={classes.BlurryContainer}>

            <div className={classes.LoginContainerWrapper}>

                <div onClick={(e) => e.stopPropagation()} className={classes.LoginContainer}>

                    {/* // Close window button */}
                    <i onClick={handleLoginCloseClick} className={"fa-solid fa-xmark " + classes.closeIcon}></i>

                    <h1 className={classes.LoginTitle}> Login </h1>

                    {/* Email Input  */}
                    <p className={classes.inputLabel}> Enter email or username </p>
                    <p className={"control has-icons-left has-icons-right " + classes.myControl}>
                        <input className="input" type="email" placeholder="Email" />

                        <span className={"icon is-small is-left " + classes.myIcon}>
                            <i className="fas fa-envelope"></i>
                        </span>
                    </p>


                    {/* Password Input  */}
                    <p className={classes.inputLabel}> Enter password </p>
                    <p className={"control has-icons-left " + classes.myControl}>
                        <input className="input" type="password" placeholder="Password" />
                        <span className={"icon is-small is-left " + classes.myIcon}>
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>

                    <div className='errorMessageContainer'>
                        <p className='errorMessageText'>
                            - Incorect password
                            - User not found
                        </p>
                    </div>

                    <button className='btnFormMaxWidth btnPurple'>
                        Continue
                    </button>

                    <br /> <br />
                    <p className='textGray-medium text-center'>
                        Don&apos;t have an account yet? <br /><span className='linkText'>Create one</span>
                    </p>

                </div>

            </div>

        </div>
    )
}

export default LoginForm