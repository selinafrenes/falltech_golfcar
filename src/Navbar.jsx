import React, {useRef} from 'react';
// import '/src/styles/style.css';
import {openLoginWindow} from './script';
import {useLocation, Link, useNavigate, NavLink} from 'react-router-dom';

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

/*TODO Problem mit Zum Projekt, Über Uns und Sponsor bei Impressum und Datenschutz*/

function Navbar() {
    const location = useLocation();
    const scrollToElement = (elementId) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        /*useNavigate("/"); */
        const element = document.getElementById(elementId);
        if(element) {
            element.scrollIntoView({ behavior: 'smooth'});
        }
    };

    const scrollToSponsor = () => {

        scrollToElement("sponsor");
    };

    const scrollToAboutUs = () => {
        scrollToElement("aboutUs");
    };

    const scrollToZumProjekt = () => {
        scrollToElement("zumProjekt");
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-a-container"> {/*TODO Funktioniert noch nicht*/}
                    {/*<Link to="/">*/}
                        <img className="logo_FallTech" src="/assets/images/FallTech_Logo.svg" alt="Logo FallTech"/>
                    {/*</Link>*/}
                </div>
                <div className="navbar-a-container">
                    <button onClick={scrollToZumProjekt}>Zum Projekt</button>
                </div>
                <div  className="navbar-a-container">
                    <button onClick={scrollToAboutUs}>Unser Team</button>
                </div>
                <div className="navbar-a-container">
                    <button onClick={scrollToSponsor}>Sponsor</button>

                    {/*<NavLink to="/" onClick={() => scrollToSponsor()}>Zum Sponsor</NavLink>
                        <Link to="/" onClick={scrollToSponsor}>Zum Sponsor</Link>
                */}
                    </div>
                <div className="navbar-a-container" id="loginButton">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <button onClick={openLoginWindow}>{textTagebuch(location)}</button>
                </div>
            </nav>
        </>

    );
}
export default Navbar;