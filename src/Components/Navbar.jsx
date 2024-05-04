import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getCookieValue} from '../script';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isNavigated, setIsNavigated] = useState("/");

    const deleteCookie = (cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    const logout = () => {
        deleteCookie('username');
        deleteCookie('firstname');
        deleteCookie('lastname');
        deleteCookie('teammember');

        navigate("/");
    }

// Anmelde Cookie setzten und merken
    function openLoginWindow() {
        // Öffne das Anmeldefenster nur, wenn der Benutzer nicht auf der Homepage ist oder der Anmelde-Cookie nicht gesetzt ist

        const loginWindow = document.getElementById('loginWindow');
        if (!getCookieValue("username")) {
            // Führe hier die Aktion aus, um das Anmeldefenster zu öffnen
            loginWindow.style.display = 'block';
            console.log('Anmeldefenster öffnen');
        } else {
            // window.location.href = '/tagebuch';
            navigate("/tagebuch");
            console.log('Tagebuch öffnen');
        }
    }

    function textTagebuch (currentLocation) {
        let location = currentLocation;
        if(location.pathname === '/' || location.pathname === '/impressum' || location.pathname === '/datenschutz' || location.pathname === '/swagger'){
            return (<button id="tagebuchBtn" onClick={openLoginWindow}><p>Tagebuch</p></button>);
        } else if (location.pathname === '/tagebuch'){
            return (<button id="logoutBtn" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></button>);
        }
    }

    // Funktion zum Scrollen zum entsprechenden Abschnitt
    useEffect(() => {
        if (isNavigated !== "/") {
            const element = document.getElementById(isNavigated);
            if (element) {
                element.style.scrollMarginTop = '136px';
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setIsNavigated("/");
        }
    }, [isNavigated]);

    // Funktion zum Scrollen zu einem bestimmten Element
    const scrollToElement = (elementId) => {
        navigate('/');
        setIsNavigated(elementId);
    };

    // Funktion zum Weiterleiten zur Startseite
    const toIndex = () => {
        navigate("/");
        console.log('Zu Index');
    }

    // Rendern der Navbar-Komponente
    return (
        <>
            <nav className="navbar">
                <div className="navbar-a-container">
                    <button id="navbar-logo" onClick={toIndex}><img className="logo_FallTech" src="/assets/images/FallTech_Logo.svg" alt="Logo FallTech"/></button>
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
                    {textTagebuch(location)}
                </div>
            </nav>
        </>
    );
}
export default Navbar;