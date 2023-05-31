import React, { createContext, useState } from 'react'
import LoginForm from '../components/popups/LoginForm';

export const ContextPopups = createContext(null);


// Purpose of this Context is to manage all popups on page
// Mainly for Login, signin components 
function PopupsContext(props) {

    // Flip this when window is on or off (like login page)
    const [showPopup, setShowPopup] = useState(false)

    // This will monitor what popup is currently on 
    // Possible states:
    // - "" if nothing is ON
    // - LOGIN_FORM
    // - SIGNIN_FORM
    const [currentPopup, setCurrentPopup] = useState("")


    return (
        <ContextPopups.Provider value={{ showPopup, setShowPopup, currentPopup, setCurrentPopup }}>

            {(showPopup && currentPopup === "LOGIN_FORM") && <LoginForm />}

            {props.children}
        </ContextPopups.Provider>
    )
}

export default PopupsContext