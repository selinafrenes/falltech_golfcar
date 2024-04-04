import {Link} from "react-router-dom";

function Footer() {
    return(
        <>
            <footer>
                <nav className="footer">
                    <Link to="/impressum" id="impressumBtn">Impressum</Link>
                    <Link to="/datenschutz" id="datenschutzBtn">Datenschutz</Link>
                        {/*// Weitere Links*/}
                </nav>
            </footer>
        </>
    );
}

export default Footer;