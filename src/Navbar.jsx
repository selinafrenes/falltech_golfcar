import React, {useEffect, useState} from 'react';
import {openLoginWindow} from './script';
import {useLocation, useNavigate} from 'react-router-dom';
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
    const navigate = useNavigate();
    const [isNavigated, setIsNavigated] = useState("/");

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
                    <button onClick={openLoginWindow}>{textTagebuch(location)}</button>
                </div>
            </nav>
        </>

    );
}
export default Navbar;