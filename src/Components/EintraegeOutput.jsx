
import { useEffect, useState} from "react";
import Table from "./Table";
import ToggleButton from "./ToggleButton";

function EintraegeOutput(){

    const [entersData, setEntersData] = useState(null);
    const [toggle, setToggle] = useState(false);

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

    // TODO
    const [filterPerson, setFilterPerson] = useState(false);
    const filterByPerson = () => {
        setFilterPerson(!filterPerson);
    };

    return(
        <div className="output-wrapper">
            <div className="output-container">
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