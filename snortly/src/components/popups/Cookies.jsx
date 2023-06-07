import React, { useContext } from 'react'
import classes from './Cookies.module.scss'
import { ContextPopups } from '../../context/popupsContext'

function Cookies() {

    const { setShowCookies } = useContext(ContextPopups);

    function handleCookieClose() {
        // Currently only closes it, and does nothing.. 
        setShowCookies(false)
    }

    function handleCookieAccept() {
        // Currently only closes it, and does nothing.. 
        handleCookieClose()
    }

    return (
        <div className={classes.CookiesContainer}>

            {/* // Title and close cookie container  */}
            <div className={classes.CookiesTitleContainer}>
                <h2 className={classes.CookieTitle}> We use <span> Cookies </span> </h2>
                <i onClick={handleCookieClose} className={"fa-solid fa-xmark " + classes.closeIcon}></i>

                {/* <img src="https://cdn-icons-png.flaticon.com/512/8383/8383513.png" alt="Cookie Icon" /> */}

            </div>

            <p className={classes.CookieText}>
                This website uses cookies to ensure you get the best experience on our website
            </p>

            {/* Handle Cookie accept here  */}
            <button onClick={handleCookieAccept} className='btnBlack'>
                Understood, YUM!
            </button>

            {/* Learn more  */}
            <div onClick={handleCookieClose} className={classes.LearnMoreContainer}>
                <a href="/" className='linkText-White'> Learn more </a>
            </div>

        </div>
    )
}

export default Cookies