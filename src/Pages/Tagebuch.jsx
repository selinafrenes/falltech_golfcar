import '../../src/styles/style.css';
import EintragForm from "../Components/EintragForm";
import {useState} from "react";
import EintraegeOutput from "../Components/EintraegeOutput";
import {getCookieValue} from "../script";
import TagebuchNavbar from "../Components/TagebuchNavbar";

/**
 * Tagebuch-Komponente dient zur Anzeige von Tagebucheinträgen.
 * @returns {JSX.Element} Eine React-Komponente, die die Tagebuchseite darstellt.
 */
function Tagebuch() {
    const [reloadTrigger, setReloadTrigger] = useState(false); // Zustandsvariable für den Neu-Laden-Trigger

    // Funktion zum Neu-Laden
    const reloadData = () => {
        setReloadTrigger(!reloadTrigger); // Ändert den Wert von reloadTrigger, um useEffect auszulösen
    };

    const teammember = getCookieValue("teammember");

    return(
        <>
            {/*TODO noch swagger einbinden mit kleiner "Navbar darunter*/}

            <div className="tagebuch">
                <TagebuchNavbar />
                <h1 id="tagebuchTitel">Tagebuch</h1>
                <h2>Willkommen {getCookieValue("firstname")}</h2>
                {teammember === "1" ? <EintragForm onreload={reloadData}/> : <></>}
                <EintraegeOutput onreload={reloadData} trigger={reloadTrigger}/>
            </div>
        </>
    );
}

export default Tagebuch;

