import React from "react";
import Navbar from "../navbar/Navbar";

function Layout(props) {

    return (
        <div>
            <Navbar />
            <p> aaa </p>
            {props.children}
        </div>
    )
}

export default Layout;