import {Link} from "react-router-dom";

function Footer() {
    return(
        <>
            <footer>
                <nav className="footer">
                    <Link to="/impressum">Impressum</Link>
                    <Link to="/datenschutz">Datenschutz</Link>
                        {/*// Weitere Links*/}
                </nav>
            </footer>
        </>
    );

}

export default Footer;