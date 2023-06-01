import React from "react";
import Navbar from "../navbar/Navbar";
import PopupsContext from "../../context/popupsContext";

function Layout(props) {

    return (
        <PopupsContext>

            <Navbar />
            {props.children}

        </PopupsContext>
    )
}

export default Layout;