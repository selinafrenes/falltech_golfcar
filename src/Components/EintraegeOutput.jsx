
import { useEffect, useState} from "react";
import Table from "./Table";
import ToggleButton from "./ToggleButton";
import {toast} from "react-toastify";

/**
 * Eine Komponente zur Anzeige von Einträgen aus einem Tagebuch.
 * @param {object} props - Die Eigenschaften (Props) der Komponente.
 * @param {function} props.onreload - Die Funktion zum Auslösen des Triggers.
 * @param {boolean} props.trigger - Der Trigger für das Aktualisieren der Einträge.
 * @returns {JSX.Element} Die gerenderte EintraegeOutput-Komponente.
 */
function EintraegeOutput(props){

    // Zustand für die geholten Daten der Einträge
    const [entersData, setEntersData] = useState(null);

    // Effekt zum Holen der Einträge beim Laden der Komponente oder bei Änderungen des Triggers
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/tagebuch/entries', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const jsonData = await response.json();
                setEntersData(jsonData);
            } catch (err) {
                toast.error("Fehler beim holen der Daten aus der Datenbank");
            }
        };
        fetchData();
    }, [props.trigger]);

    // Zustand und Funktionen für das Filtern der Einträge
    const [filterPerson, setFilterPerson] = useState(false);
    const filterByPerson = () => {
        setFilterPerson(!filterPerson);
    };
    // Funktion zum neu Laden der Daten
    const reloadData = () => {
        toast.info("Daten wurden neu geladen");
        props.onreload();
    }

    // Rendern der EintraegeOutput-Komponente
    return(
        <div className="output-wrapper">
            <div className="output-container">
                <button id="reloadDataBtn" onClick={reloadData}>Neu Laden</button>
                <p className="p_beiOutput">Sortieren nach: </p>
                <div className="filternNach">
                    <p>Datum</p>
                    <ToggleButton onChange={filterByPerson}/>
                    <p>Person</p>
                </div>

                <div className="output-field" id="enters">
                    {/*<p>Hello OUTPUT</p>*/}
                    {entersData && <Table filter={filterPerson} data={entersData}/>}
                </div>
            </div>
        </div>

    );
}
export default EintraegeOutput;