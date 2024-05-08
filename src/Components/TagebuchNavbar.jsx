import React from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * Rendert eine Navbar für das Tagebuch mit Navigationsfunktionen.
 * @returns {JSX.Element} Die gerenderte Navbar-Komponente.
 */
function TagebuchNavbar() {
    const navigate = useNavigate();


    /**
     * Funktion zum Weiterleiten zur Swagger-Seite.
     */
    const toSwagger = () => {
        navigate("/swagger");
    }

    const toController = () => {
        // navigate("/Controller");
        // navigate("/controller");
        window.location.href = "/controller";
        navigate("/controller");
    }

    // Rendern der Navbar-Komponente
    return (
        <>
            <nav className="tagebuchNavbar">
                <div className="tagebuchNavbarItem">
                    <button id="toSwaggerBtn" onClick={toSwagger}>Swagger</button>
                </div>
                <div className="tagebuchNavbarItem">
                    <button id="toOtherSiteBtn" onClick={toController}>Controller</button>
                </div>
            </nav>
        </>
    );
}
export default TagebuchNavbar;