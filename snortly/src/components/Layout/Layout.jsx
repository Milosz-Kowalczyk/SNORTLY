import React from "react";
import Navbar from "../navbar/Navbar";
import PopupsContext from "../../context/popupsContext";

function Layout(props) {

    return (
        <div>

            <PopupsContext>

                <Navbar />

                {props.children}

            </PopupsContext>
        </div>
    )
}

export default Layout;