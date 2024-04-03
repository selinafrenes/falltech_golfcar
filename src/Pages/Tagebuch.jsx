import '../../src/styles/style.css';
import EintragForm from "../Components/EintragForm";
import {useEffect, useState} from "react";
import EintraegeOutput from "../Components/EintraegeOutput";

function Tagebuch() {
    const [data, setData] = useState(null);
    const [reloadTrigger, setReloadTrigger] = useState(false); // Zustandsvariable für den Neu-Laden-Trigger


    // Funktion zum Neu-Laden
    const reloadData = () => {
        setReloadTrigger(!reloadTrigger); // Ändert den Wert von reloadTrigger, um useEffect auszulösen
    };

    useEffect(() => {
        if (data?.success) {
            // Erfolgreiche Verarbeitung
            // ... (z.B. Formular leeren oder zur nächsten Seite navigieren)
        }
    }, [data]);

    return(
        <>
            {/*{data?.success && alert("Erfolgreich abgesendet")}*/}
            <EintragForm onreload={reloadData}/>
            <EintraegeOutput onreload={reloadData} trigger={reloadTrigger}/>

            {/*<script type="text/javascript" src="../Tagebuch.js"></script>*/}
        </>
    );
}

export default Tagebuch;

