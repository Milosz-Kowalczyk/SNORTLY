import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";

import logoWhite from './snortHub_Logo1.png';

import './Navbar.scss'
import '../../styles/globals.scss'
import { ContextPopups } from "../../context/popupsContext";


function Navbar() {

    const { setCurrentPopup, setShowPopup } = useContext(ContextPopups)

    // Both refs used to controll two elements that needs additional class to show on mobile 
    const navbarBurger = useRef(null);
    const navbarMenu = useRef(null);

    // Funtion that toggles classes of both elements (in mobile mode)
    function toggleMenu() {
        navbarBurger.current.classList.toggle("is-active")
        navbarMenu.current.classList.toggle("is-active")
    }

    // Function when login button is clicked
    function handleLoginButtonClick() {
        setShowPopup(true);
        setCurrentPopup("LOGIN_FORM");
    }

    // Function when sign in button is clicked
    function handleSigninButtonClick() {
        setShowPopup(true);
        setCurrentPopup("SIGNIN_FORM");
    }


    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">

                    {/* Logo  */}
                    <a className="navbar-item" href="/">
                        <img alt="" src={logoWhite} />
                    </a>

                    {/* Nav burger  */}
                    <button onClick={toggleMenu} ref={navbarBurger} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>

                <div id="navbarBasicExample" className="navbar-menu" ref={navbarMenu}>
                    {/* Nav start, our main options */}
                    <div className="navbar-start">
                        <Link className="navLinkLight" href='/'>  Hot  </Link>
                        <Link className="navLinkLight" href='/'>  Trending  </Link>
                        <Link className="navLinkLight" href='/'>  Fresh  </Link>
                    </div>

                    {/* Login / sign up buttons, with user profile  */}
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={handleSigninButtonClick} className="button btnPurple">
                                    <strong>Sign up</strong>
                                </button>

                                <button onClick={handleLoginButtonClick} className="button btnLightBorder">
                                    Log in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )

}

export default Navbar;