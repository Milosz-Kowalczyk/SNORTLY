import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { ContextPopups } from "../../context/popupsContext";
import { ContextActions } from "../../context/actionsContext";

import logoWhite from './snortHub_Logo1.png';

import '../../styles/globals.scss'
import './Navbar.scss'



function Navbar() {

    const { setCurrentPopup, setShowPopup } = useContext(ContextPopups)
    const { showSidePanels, setShowSidePanels } = useContext(ContextActions)


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

    // When new post is clicked 
    function handleNewPostButtonClick() {
        setShowPopup(true);
        setCurrentPopup("NEW_POST");
    }


    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">

                    {/* Logo  */}
                    <a className="navbar-item" href="/">
                        <img alt="" src={logoWhite} />
                    </a>

                    <div className="navbar-item" onClick={handleNewPostButtonClick} >
                        <button className="button btnPurple navbar-newPostButton">
                            <i style={{ marginRight: "0.5rem" }} className="fa-solid fa-pen-to-square"></i> New Post
                        </button>
                    </div>


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

                        {/* Action Hide Categories and right panel | Focus mode */}
                        <div onClick={() => { setShowSidePanels(!showSidePanels) }} className={"hoverScale navbar-FocusContainer navbar-item"}>

                            {(showSidePanels)
                                ? <i className={"fa-solid fa-expand"}></i>
                                : <i className="fa-solid fa-expand FocusActive"></i>
                            }

                        </div>
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