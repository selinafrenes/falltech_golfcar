import React from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * Rendert eine Navbar für das Tagebuch mit Navigationsfunktionen.
 * @returns {JSX.Element} Die gerenderte Navbar-Komponente.
 */
function TagebuchNavbar() {
    // const location = useLocation();
    const navigate = useNavigate();


    /**
     * Funktion zum Weiterleiten zur Swagger-Seite.
     */
    const toSwagger = () => {
        navigate("/swagger");
    }

    // Rendern der Navbar-Komponente
    return (
        <>
            <nav className="tagebuchNavbar">
                <div className="tagebuchNavbarItem">
                    <button id="toSwaggerBtn" onClick={toSwagger}>Swagger</button>
                </div>
                <div className="tagebuchNavbarItem">
                    {/* TODO : Zum Projekt Button - Funktionalität noch nicht implementiert */}
                    <button id="toOtherSiteBtn" /*onClick={}*/>Zum Projekt</button>
                </div>
            </nav>
        </>
    );
}
export default TagebuchNavbar;