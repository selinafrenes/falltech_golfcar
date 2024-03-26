import '../../src/styles/style.css';
import EintragForm from "../Components/EintragForm";
import {useEffect, useState} from "react";

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
            <div className="output-wrapper">
                <div className="output-container">
                    <form action="http://localhost:8000/tagebuch.html/submit" className="filter and search" method="get">
                        <div className="suchen">
                            <label className="label-input-text-field" htmlFor="searchInput">Suchen nach Beschreibung</label>
                            <input className="input-text-field" type="text" id="searchInput"/>

                                <fieldset className="checkbox-container">
                                    <legend>Personen:</legend>
                                    <div className="checkbox-wrapper">
                                        <label className="checkbox-input" htmlFor="checkboxDamian">
                                            <input className="input-checkbox-field" type="checkbox" id="checkboxDamian2"
                                                   name="people" value="mayrdamian"/>
                                        </label>
                                        <label className="checkbox-label" htmlFor="checkboxDamian">Damian</label>
                                    </div>
                                    <div className="checkbox-wrapper">
                                        <label className="checkbox-input" htmlFor="checkboxDavid">
                                            <input className="input-checkbox-field" type="checkbox" id="checkboxDavid2"
                                                   name="people" value="mairhoferdavid"/>
                                        </label>
                                        <label className="checkbox-label" htmlFor="checkboxDavid">David</label>
                                    </div>
                                    <div className="checkbox-wrapper">
                                        <label className="checkbox-input" htmlFor="checkboxFabian">
                                            <input className="input-checkbox-field" type="checkbox" id="checkboxFabian2"
                                                   name="people" value="reiferfabian"/>
                                        </label>
                                        <label className="checkbox-label" htmlFor="checkboxFabian">Fabian</label>
                                    </div>
                                    <div className="checkbox-wrapper">
                                        <label className="checkbox-input" htmlFor="checkboxSelina">
                                            <input className="input-checkbox-field" type="checkbox" id="checkboxSelina2"
                                                   name="people" value="frenesselina"/>
                                        </label>
                                        <label className="checkbox-label" htmlFor="checkboxSelina">Selina</label>
                                    </div>
                                    <div className="checkbox-wrapper">
                                        <label className="checkbox-input" htmlFor="checkboxWilma">
                                            <input className="input-checkbox-field" type="checkbox" id="checkboxWilma2"
                                                   name="people" value="frenerwilma"/>
                                        </label>
                                        <label className="checkbox-label" htmlFor="checkboxWilma">Wilma</label>
                                    </div>
                                </fieldset>
                        </div>
                        <div>
                            <label htmlFor="date_filter">Datum:</label>
                            <input className="input-date-field" type="date" id="date_filter" name="date"/>
                        </div>
                        <button type="button" className="submitBtn" id="searchButton">Suchen</button>
                    </form>
                    <div className="output-field" id="enters">
                        <p>Hello OUTPUT</p>
                    </div>

                </div>

                <div className="output">

                </div>


            </div>



            <script type="text/javascript" src="../Tagebuch.js"></script>
        </>
    );
}

export default Tagebuch;

