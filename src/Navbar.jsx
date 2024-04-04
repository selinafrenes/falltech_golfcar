import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



/*TODO evt window.location.href mit navigate (useNavigate) ersetzten???*/



function getCookieValue(cookieName) {
    // Zuerst die Cookies anhand ihres Namens suchen
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        // Prüfen, ob der Name des aktuellen Cookies dem gewünschten Namen entspricht
        if (cookie.startsWith(cookieName + '=')) {
            // Wenn ja, den Wert des Cookies zurückgeben
            return cookie.substring(cookieName.length + 1);
        }
    }
    // Wenn kein entsprechendes Cookie gefunden wird, wird null zurückgegeben
    return null;
}


function deleteCookie(cookieName){
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // setIsLoggedIn(false);
}

function logout() {
    deleteCookie('username');
    window.location.href = '/';
    console.log("Abgemeldet!!!");
}

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isNavigated, setIsNavigated] = useState("/");

// Anmelde Cookie setzten und merken
    function openLoginWindow() {
        // Öffne das Anmeldefenster nur, wenn der Benutzer nicht auf der Homepage ist oder der Anmelde-Cookie nicht gesetzt ist
        if (!getCookieValue("username")){
            // Führe hier die Aktion aus, um das Anmeldefenster zu öffnen
            document.getElementById('loginWindow').style.display = 'block';
            console.log('Anmeldefenster öffnen');
        } else {
            window.location.href = '/tagebuch';
            console.log('Tagebuch öffnen');
        }
    }

    function textTagebuch (currentLocation) {
        let location = currentLocation;
        if(location.pathname === '/' || location.pathname === '/index' || location.pathname === '/impressum' || location.pathname === '/datenschutz'){
            return (<button onClick={openLoginWindow}><p>Tagebuch</p></button>);
        } else if (location.pathname === '/tagebuch'){
            return (<button onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /></button>);
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
    return (
        <>
            <nav className="navbar">
                <div className="navbar-a-container"> {/*TODO Funktioniert noch nicht*/}
                    <img className="logo_FallTech" src="/assets/images/FallTech_Logo.svg" alt="Logo FallTech"/>
                </div>
                <div className="navbar-a-container">
                    <button onClick={() => scrollToElement("zumProjekt")}>Zum Projekt</button>
                </div>
                <div  className="navbar-a-container">
                    <button onClick={() => scrollToElement("aboutUs")}>Unser Team</button>
                </div>
                <div className="navbar-a-container">
                    <button onClick={() => scrollToElement("sponsor")}>Sponsor</button>
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