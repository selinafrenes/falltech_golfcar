import CheckboxElement from "./CheckboxElement";
import {useEffect, useState} from "react";
import Table from "./Table";

function EintraegeOutput(){

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
                console.log("erorrrrrrrrrrrrrrrrrrrrrrrrr: " + err.message);
            }
        };

        fetchData();
    }, []);


    if (entersData){
        console.log("ENTERSDATA sind daaaaa");
        // const { entersResult, entryResult } = entersData;

    }

    // else if (isLoading) {
    //     return <p>Loading...</p>;
    // } else{
    //     return <p>Fehler</p>;
    // }

    return(
        <div className="output-wrapper">
            <div className="output-container">
                <form action="http://localhost:8000/tagebuch.html/submit" className="filter and search" method="get">
                    <div className="suchen">
                        <label className="label-input-text-field" htmlFor="searchInput">Suchen nach Beschreibung</label>
                        <input className="input-text-field" type="text" id="searchInput"/>

                        <fieldset className="checkbox-container">
                            <legend>Personen:</legend>
                            <CheckboxElement username="mayrdamian" firstname="Damian"/>
                            <CheckboxElement username="mairhoferdavid" firstname="David"/>
                            <CheckboxElement username="reiferfabian" firstname="Fabian"/>
                            <CheckboxElement username="frenesselina" firstname="Selina"/>
                            <CheckboxElement username="frenerwilma" firstname="Wilma"/>
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
            {/*{entersData && <Table data={entersData}/>}*/}
            <div className="output">
            </div>
        </div>

    );
}
export default EintraegeOutput;