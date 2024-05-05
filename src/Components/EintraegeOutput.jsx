import { useEffect, useState} from "react";
import Table from "./Table";
import ToggleButton from "./ToggleButton";
import {toast} from "react-toastify";

/**
 * Eine Komponente zur Anzeige von Tagebucheinträgen.
 * @param {Object} props - Die Eigenschaften (Props) der Komponente.
 * @param {function} props.onreload - Die Funktion zum Neu-Laden der Daten.
 * @param {boolean} props.trigger - Der Trigger für das Aktualisieren der Einträge.
 * @returns {JSX.Element} Die gerenderte EintraegeOutput-Komponente.
 */
function EintraegeOutput(props){
    // Zustand für die geholten Daten der Einträge
    const [data, setData] = useState(null);
    // Zustand und Funktionen für das Filtern der Einträge
    const [filter, setFilter] = useState(false);
    // Zustand für den Ladeindikator
    const [loading, setLoading] = useState(true);

    /**
     * Holt die Eintragsdaten aus der Datenbank.
     * @param {boolean} [newFilter] - Der neue Filterwert für die Anfrage.
     */
    const fetchData = async (newFilter) => {
        setLoading(true);
        console.log("EO_fetchData beginning: filterPers: " + filter);
        try {
            let path;
            if (newFilter ?? filter){
                path = "http://10.10.31.11:8000/api/v1/diary/entries/grouped-by-user";
            }else{
                path = "http://10.10.31.11:8000/api/v1/diary/entries/grouped-by-date"
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
        console.log("Fetching the new Data ");
        fetchData();
    }, [props.trigger]);


    /**
     * Funktion zum Filtern der Einträge nach Personen.
     */
    const filterByPerson = () => {
        // weil fetchData async ist
        setFilter(prevFilter => {
            const newFilter = !prevFilter;
            fetchData(newFilter);
            return newFilter;
        });
    };

    /**
     * Funktion zum Neu-Laden der Daten.
     */
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