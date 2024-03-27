import React from 'react';
// import '/src/styles/style.css';
import {openLoginWindow} from './script';
import { useLocation } from 'react-router-dom';

import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function textTagebuch (currentLocation) {
    let location = currentLocation;
    if(location.pathname === '/' || location.pathname === '/index' || location.pathname === '/impressum' || location.pathname === '/datenschutz'){
        return (<p>Tagebuch</p>);
    } else if (location.pathname === '/tagebuch'){
        return (<FontAwesomeIcon icon={faRightFromBracket} />);
    }
}

function Navbar() {
    const location = useLocation();
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
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={openLoginWindow}>{textTagebuch(location)}</a>
                </div>
            </nav>
        </>

    );
}
export default Navbar;