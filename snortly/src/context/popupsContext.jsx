import React, { createContext, useState } from 'react'
import LoginForm from '../components/popups/LoginForm';
import SigninForm from '../components/popups/SigninForm';
import ForgotPasswordForm from '../components/popups/ForgotPasswordForm';
import Cookies from '../components/popups/Cookies';

export const ContextPopups = createContext(null);


// Purpose of this Context is to manage all popups on page
// Mainly for Login, signin components 
function PopupsContext(props) {

    // Flip this when window is on or off (like login page)
    const [showPopup, setShowPopup] = useState(false)

    //  This will monitor what popup is currently on 
    //  Possible states:
    //  - "" if nothing is ON
    //  - LOGIN_FORM
    //      - FORGOT_PASSWORD_FORM

    //  - SIGNIN_FORM
    const [currentPopup, setCurrentPopup] = useState("")

    // Additional State for cookies, they should be runned once (store it on cookies hehe)
    const [showCookies, setShowCookies] = useState(false)


    return (
        <ContextPopups.Provider value={{ showPopup, setShowPopup, currentPopup, setCurrentPopup, setShowCookies }}>

            {(showPopup && currentPopup === "LOGIN_FORM") && <LoginForm />}
            {(showPopup && currentPopup === "SIGNIN_FORM") && <SigninForm />}
            {(showPopup && currentPopup === "FORGOT_PASSWORD_FORM") && <ForgotPasswordForm />}

            {(showCookies) && <Cookies />}


            {props.children}
        </ContextPopups.Provider>
    )
}

export default PopupsContext