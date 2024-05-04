import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getCookieValue} from '../script';

/**
 * Eine Navigationsleistenkomponente für die Website.
 * Enthält Links zur Startseite, zum Projekt, zum Team, zum Sponsor und zum Tagebuch.
 * @returns {JSX.Element} Die gerenderte Navbar-Komponente.
 */
function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isNavigated, setIsNavigated] = useState("/");

    /**
     * Löscht einen Cookie anhand seines Namens.
     * @param {string} cookieName - Der Name des Cookies, der gelöscht werden soll.
     */
    const deleteCookie = (cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    /**
     * Loggt den Benutzer aus, indem die entsprechenden Cookies gelöscht werden und er zur Startseite weitergeleitet wird.
     */
    const logout = () => {
        deleteCookie('username');
        deleteCookie('firstname');
        deleteCookie('lastname');
        deleteCookie('teammember');

        navigate("/");
    }

    /**
     * Öffnet das Anmeldefenster oder leitet den Benutzer zum Tagebuch weiter, je nach aktuellem Standort.
     */
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

    /**
     * Rendert den Text/das Symbol für den Tagebuch-Button je nach Standort.
     * @param {Object} currentLocation - Der aktuelle Standort der Seite.
     * @returns {JSX.Element} - Ein Button-Element für das Tagebuch oder den Logout.
     */
    function textTagebuch (currentLocation) {
        let location = currentLocation;
        if(location.pathname === '/' || location.pathname === '/impressum' || location.pathname === '/datenschutz' || location.pathname === '/swagger'){
            return (<button id="tagebuchBtn" onClick={openLoginWindow}><p>Tagebuch</p></button>);
        } else if (location.pathname === '/tagebuch'){
            return (<button id="logoutBtn" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></button>);
        }
    }

    /**
     * Scrollt zum Abschnitt mit der angegebenen ID, wenn `isNavigated` sich ändert.
     */
    useEffect(() => {
        if (isNavigated !== "/") {
            const element = document.getElementById(isNavigated);
            element.style.scrollMarginTop = '136px';

            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setIsNavigated("/");
        }
    }, [isNavigated]);

    /**
     * Scrollt zur angegebenen Seitelement-ID und setzt den Zustand für das Scrollen.
     * @param {string} elementId - Die ID des Elements, zu dem gescrollt werden soll.
     */
    const scrollToElement = (elementId) => {
        navigate('/');
        setIsNavigated(elementId);
    };

    /**
     * Leitet den Benutzer zur Startseite weiter.
     */
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