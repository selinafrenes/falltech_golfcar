import '../../src/styles/style.css';
import EintragForm from "../Components/EintragForm";
import {useEffect, useState} from "react";
import EintraegeOutput from "../Components/EintraegeOutput";

function Tagebuch() {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (data?.success) {
            // Erfolgreiche Verarbeitung
            // ... (z.B. Formular leeren oder zur nächsten Seite navigieren)
        }
    }, [data]);

    return(
        <>
            {/*{data?.success && alert("Erfolgreich abgesendet")}*/}
            <EintragForm />
            <EintraegeOutput />

            <script type="text/javascript" src="../Tagebuch.js"></script>
        </>
    );
}

export default Tagebuch;

