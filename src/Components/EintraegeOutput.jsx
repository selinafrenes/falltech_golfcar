import { useEffect, useState} from "react";
import Table from "./Table";
import ToggleButton from "./ToggleButton";
import {toast} from "react-toastify";

/* TODO KOMMENTARRRR*/
function EintraegeOutput(props){
    // Zustand für die geholten Daten der Einträge
    const [data, setData] = useState(null);
    // Zustand und Funktionen für das Filtern der Einträge
    const [filter, setFilter] = useState(false);
    // Zustand für den Ladeindikator
    const [loading, setLoading] = useState(true);

    const fetchData = async (newFilter) => {
        setLoading(true);
        console.log("EO_fetchData beginning: filterPers: " + filter);
        try {
            let path;
            if (newFilter ?? filter){
                path = "http://localhost:8000/tagebuch/eintraege/personen";
            }else{
                path = "http://localhost:8000/tagebuch/eintraege/datum"
            }
            console.log("Anfrage an: " + path);
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
        } finally {
            // Setze loading auf false, nachdem die Daten geladen wurden oder ein Fehler aufgetreten ist
            setLoading(false);
        }
    };


    // Effekt zum Holen der Einträge beim Laden der Komponente oder bei Änderungen des Triggers
    useEffect(() => {
        fetchData();
        console.log("Fetching the new Data ")
    }, [props.trigger]);



    const filterByPerson = () => {
        // weil fetchData async ist
        setFilter(prevFilter => {
            const newFilter = !prevFilter;
            fetchData(newFilter);
            return newFilter;
        });
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
                    {loading ? (
                        // TODO noch das mit dem Springen fixen
                        <p>Laden...</p>
                    ) : (
                        data &&  <Table data={data} filter={filter} />
                    )}
                </div>
            </div>
        </div>

    );
}
export default EintraegeOutput;