import {Link} from "react-router-dom";

/**
 * Eine Komponente für den Footer der Webseite.
 * Enthält Links zum Impressum und Datenschutz.
 * @returns {JSX.Element} Die gerenderte Footer-Komponente.
 */
function Footer() {
    // Rendern des Footers mit Links
    return(
        <>
            <footer>
                <nav className="footer">
                    {/* Link zum Impressum */}
                    <Link to="/impressum" id="impressumBtn">Impressum</Link>
                    {/* Link zum Datenschutz */}
                    <Link to="/datenschutz" id="datenschutzBtn">Datenschutz</Link>
                </nav>
            </footer>
        </>
    );
}

export default Footer;