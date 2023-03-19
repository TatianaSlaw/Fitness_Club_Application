import logo from "../assets/logo.svg";
import React from "react";

function Header() {

    return (
        <div className="header-container">
            <img src={ logo }  alt="Fitness club logo"/>
        </div>
        )
}

export default Header;