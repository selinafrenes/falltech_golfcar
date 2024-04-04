import '../../src/styles/style.css';
import EintragForm from "../Components/EintragForm";
import {useState} from "react";
import EintraegeOutput from "../Components/EintraegeOutput";
import {getCookieValue} from "../script";

function Tagebuch() {
    const [reloadTrigger, setReloadTrigger] = useState(false); // Zustandsvariable für den Neu-Laden-Trigger

    // Funktion zum Neu-Laden
    const reloadData = () => {
        setReloadTrigger(!reloadTrigger); // Ändert den Wert von reloadTrigger, um useEffect auszulösen
    };


    return(
        <>
            <div id="tagebuch-eintrage">
                <h1>Tagebuch</h1>
                <h2>Willkommen {getCookieValue("firstname")}</h2>
            </div>
            <EintragForm onreload={reloadData}/>
            <EintraegeOutput onreload={reloadData} trigger={reloadTrigger}/>
        </>
    );
}

export default Tagebuch;

