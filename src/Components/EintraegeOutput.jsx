
import { useEffect, useState} from "react";
import Table from "./Table";
import ToggleButton from "./ToggleButton";

function EintraegeOutput(props){


    const [entersData, setEntersData] = useState(null);


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
                console.log("errrrrrrrrrrrrrrrrrrrrrrrrr: " + err.message);
            }
        };

        fetchData();

    }, [props.trigger]); // useEffect wird bei Änderungen von reloadTrigger ausgeführt

    // if (entersData){
    //     console.log("ENTERSDATA sind daaaaa");
    // }

    const [filterPerson, setFilterPerson] = useState(false);
    const filterByPerson = () => {
        setFilterPerson(!filterPerson);
    };

    return(
        <div className="output-wrapper">
            <div className="output-container">
                <button id="reloadDataBtn" onClick={props.onreload}>Neu Laden</button>
                <p className="p_beiOutput">Sortieren nach: </p>
                <div className="filternNach">
                    <p>Datum</p>
                    <ToggleButton onChange={filterByPerson}/>
                    <p>Person</p>
                </div>

                {/*ToDo Hook*/}

                <div className="output-field" id="enters">
                    {/*<p>Hello OUTPUT</p>*/}
                    {entersData && <Table filter={filterPerson} data={entersData}/>}
                </div>
            </div>
        </div>

    );
}
export default EintraegeOutput;