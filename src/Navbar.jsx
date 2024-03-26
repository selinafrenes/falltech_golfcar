import React from 'react';
// import '/src/styles/style.css';
import {openLoginWindow} from './script';

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-a-container">
                    {/*<Link to="/">*/}
                        <img className="logo_FallTech" src="/assets/images/FallTech_Logo.svg" alt="Logo FallTech"/>
                    {/*</Link>*/}
                </div>
                <div className="navbar-a-container">
                    <p>Zum Projekt</p>
                    {/*<a href="#zumProjekt">Zum Projekt</a>*/}
                </div>
                <div  className="navbar-a-container">
                    <p>About Us</p>
                    {/*<a href="#aboutUs">About Us</a>*/}
                </div>
                <div className="navbar-a-container">
                    {/*<a href="#sponsor">Sponsor</a>*/}
                    <p>Sponsor</p>
                </div>
                <div className="navbar-a-container" id="loginButton">
                    <a onClick={openLoginWindow}><i className="fa-solid fa-right-to-bracket"></i></a>
                </div>
            </nav>
        </>

    );
}
export default Navbar;