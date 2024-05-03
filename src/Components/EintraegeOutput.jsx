
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

    const [loading, setLoading] = useState(true); // Zustand für den Ladeindikator

    const fetchData = async (newFilter) => {
        setLoading(true);
        console.log("EO_fetchData beginning: filterPers: " + filter);
        try {
            let path;
            const f = newFilter ?? filter;
            if (f){
                console.log("Anfrage an: http://localhost:8000/tagebuch/eintraege/personen");
                path = "http://localhost:8000/tagebuch/eintraege/personen";
            }else{
                console.log("Anfrage an: http://localhost:8000/tagebuch/eintraege/datum");
                path = "http://localhost:8000/tagebuch/eintraege/datum"
            }
            console.log("EO_fetchData path: " + path);
            const response = await fetch(path, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const jsonData = await response.json();
            setData(jsonData);
            console.log("EO_fetchData result: "+JSON.stringify(data));
        } catch (err) {
            toast.error("Fehler beim holen der Daten aus der Datenbank");
        } finally {
            setLoading(false); // Setze loading auf false, nachdem die Daten geladen wurden oder ein Fehler aufgetreten ist
        }
    };


    // Effekt zum Holen der Einträge beim Laden der Komponente oder bei Änderungen des Triggers
    useEffect(() => {
        fetchData();
        console.log("EO_useEffect: Fetching the new Data ")
    }, [props.trigger]);


    // const filterByPerson = () => {
    //     console.log("EO_filterByPerson: change filter and call fetchData")
    //     debugger;
    //     setFilter(prevFilter => !prevFilter);
    //     debugger;
    //     fetchData();
    // };

    const filterByPerson = () => {
        setFilter(prevFilter => {
            const newFilter = !prevFilter;
            fetchData(newFilter);
            return newFilter;
        });

        // return !filter; // Rückgabe des neuen Filterwerts für den Toggle Button WICHITG!
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