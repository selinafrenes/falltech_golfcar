
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
    const [data, setData] = useState(null);
    // Zustand und Funktionen für das Filtern der Einträge
    const [filterPerson, setFilterPerson] = useState(false);

    // Effekt zum Holen der Einträge beim Laden der Komponente oder bei Änderungen des Triggers
    useEffect(() => {
        const fetchData = async () => {
            try {
                let path;
                if (filterPerson){
                    console.log("Anfrage an: http://localhost:8000/tagebuch/eintraege/personen");
                    path = "http://localhost:8000/tagebuch/eintraege/personen";
                }else{
                    path = "http://localhost:8000/tagebuch/eintraege/personen"
                }
                console.log("PATH: " + path);
                const response = await fetch(path, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                toast.error("Fehler beim holen der Daten aus der Datenbank");
            }
        };
        fetchData();
    }, [props.trigger]);


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
                    {data && <Table filter={filterPerson} data={data}/>}
                </div>
            </div>
        </div>

    );
}
export default EintraegeOutput;