import React from "react";
import Navbar from "../navbar/Navbar";
import PopupsContext from "../../context/popupsContext";
import ActionsContext from "../../context/actionsContext";

function Layout(props) {

    return (
        <PopupsContext>
            <ActionsContext>

                <Navbar />
                {props.children}

            </ActionsContext>
        </PopupsContext>
    )
}

export default Layout;