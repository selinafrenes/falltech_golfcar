import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getCookieValue} from '../script';
import ToggleButton from "./ToggleButton";
import {changeMode} from '../App';

const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const logout = () => {
    deleteCookie('username');
    deleteCookie('firstname');
    deleteCookie('lastname');
    deleteCookie('teammember');

    window.location.href = '/';
}

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isNavigated, setIsNavigated] = useState("/");

// Anmelde Cookie setzten und merken
    function openLoginWindow() {
        // Öffne das Anmeldefenster nur, wenn der Benutzer nicht auf der Homepage ist oder der Anmelde-Cookie nicht gesetzt ist

        const loginWindow = document.getElementById('loginWindow');
        if (!getCookieValue("username")) {
            // Führe hier die Aktion aus, um das Anmeldefenster zu öffnen
            loginWindow.style.display = 'block';
            console.log('Anmeldefenster öffnen');
        } else {
            window.location.href = '/tagebuch';
            console.log('Tagebuch öffnen');
        }
    }

    function textTagebuch (currentLocation) {
        let location = currentLocation;
        if(location.pathname === '/' || location.pathname === '/index' || location.pathname === '/impressum' || location.pathname === '/datenschutz'){
            return (<button id="tagebuchBtn" onClick={openLoginWindow}><p>Tagebuch</p></button>);
        } else if (location.pathname === '/tagebuch'){
            return (<button id="logoutBtn" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></button>);
        }
    }

// Um zum richtigen Abschnitt zu scrollen
    useEffect(() => {
        if (isNavigated !== "/") {
            const element = document.getElementById(isNavigated);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setIsNavigated("/");
        }
    }, [isNavigated]);

    const scrollToElement = (elementId) => {
        setIsNavigated(elementId);
        navigate('/');
    };

    const toIndex = () => {
        window.location.href = '/';
        console.log('Zu Index');
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-a-container"> {/*TODO Funktioniert noch nicht*/}
                    <button id="navbar-logo" onClick={toIndex}><img className="logo_FallTech" src="/assets/images/FallTech_Logo.svg" alt="Logo FallTech"/></button>
                    {/*<img className="logo_FallTech" src="/assets/images/FallTech_Logo.svg" alt="Logo FallTech"/>*/}
                </div>
                <div className="navbar-a-container">
                    <button id="zumProjektBtn" onClick={() => scrollToElement("zumProjekt")}>Zum Projekt</button>
                </div>
                <div  className="navbar-a-container">
                    <button id="uberUnsBtn" onClick={() => scrollToElement("aboutUs")}>Unser Team</button>
                </div>
                <div className="navbar-a-container">
                    <button id="sponsorBtn" onClick={() => scrollToElement("sponsor")}>Sponsor</button>
                </div>
                <div className="navbar-a-container" id="loginButton">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    {textTagebuch(location)}
                </div>
            </nav>
        </>

    );
}
export default Navbar;