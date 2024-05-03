import React, {Fragment} from 'react';

/*TODO*/
function Table(props){
    // const [filterByPerson, setFilterByPerson] = useState(false);
    // const {data, filter} = props;

    // if (!props.data || !props.data.data || !Array.isArray(props.data.data)) {
    //     return null; // Return null if data is not available or in the expected format
    // }

    return(
        <>
            {props.filter ? filterTableByUsername(props) : filterTableByDate(props)}
        </>
    )
}

// TODO OOOO kommentare!!!
const filterTableByUsername = (data) => {
    console.log("TAB_filterByUsername");

    // Rendert JSX-Tabelle mit gruppierten und sortierten Einträgen
    return (
        <table className="output-filed-table-person">
            <thead className="output-filed-table-thead-person">
            <tr>
                <th>Person</th>
                <th>Datum</th>
                <th>Zeit</th>
                <th>Beschreibung</th>
                <th>Notizen</th>
            </tr>
            </thead>
            <tbody className="output-filed-table-tbody-person">
            {data.data.map(user => (
                <Fragment key={user.username}>
                    {
                        <th rowSpan={JSON.parse(user.eintraege).length +1}>
                            {user.username}
                        </th>
                    }
                    {JSON.parse(user.eintraege) !== null && //yxc
                            JSON.parse(user.eintraege).map((entry) => (
                        <tr key={"_" + entry.id + "_" + entry.date + "_" + entry.duration}>
                            <td>{new Date(entry.date).toLocaleDateString('de-DE')}</td>
                            <td>{entry.duration}</td>
                            <td>{entry.description.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
                            <td>{entry.notes.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
                        </tr>
                    ))}

                </Fragment>
            ))}
            </tbody>
        </table>
    )

    };




// todo kommentareeeeeeee
const filterTableByDate = (data) => {
    // for (let i = 0; i < data.length; i++) {
    //     data[i].eintraege = JSON.parse(data[i].eintraege);
    // }

    console.log("TAB_filterByDate");

    // Rendert JSX-Tabelle mit gruppierten und sortierten Einträgen
    return (
        <table className="output-filed-table-person">
            <thead className="output-filed-table-thead-person">
            <tr>
                <th>Datum</th>
                <th>Person</th>
                <th>Zeit</th>
                <th>Beschreibung</th>
                <th>Notizen</th>
            </tr>
            </thead>
            <tbody className="output-filed-table-tbody-person">
            {/*//yxc old*/}
            {/*{data.data.map(e => (*/}
            {data.data && Array.isArray(data.data) && data.data.map(e => (  //yxc
                <Fragment key={new Date(e.date).toLocaleDateString('de-DE')}>
                    {
                        <th rowSpan={JSON.parse(e.eintraege).length +1}>
                            {new Date(e.date).toLocaleDateString('de-DE')}
                        </th>
                    }
                    {JSON.parse(e.eintraege).map((entry) => (
                        <tr key={"_" + entry.person + "_" + entry.id + "_" + entry.duration}>
                            <td>{entry.person}</td>
                            <td>{entry.duration}</td>
                            <td>{entry.description.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
                            <td>{entry.notes.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
                        </tr>
                    ))}
                </Fragment>
            ))}

            </tbody>
        </table>
    )


};

export default Table;

/*
const filterTableByDate = (combinedEntries) => {
    // sortieren nach Datum
    combinedEntries.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    // nach Datum gruppieren
    const groupedEntries = combinedEntries.reduce((acc, entry) => {
        const date = entry.date;
        if (!acc.hasOwnProperty(date)) {
            acc[date] = [];
        }
        acc[date].push(entry);
        return acc;
    }, {});

    // Rendert JSX-Tabelle mit gruppierten Einträgen nach Datum sortiert
    return(
        <table className="output-filed-table">
            <thead className="output-filed-table-thead">
            <tr>
                <th>Datum</th>
                <th>Person</th>
                <th>Zeit</th>
                <th>Beschreibung</th>
                <th>Notiz</th>
            </tr>
            </thead>
            <tbody className="output-filed-table-tbody">
            {Object.entries(groupedEntries).map(([date, entries]) => (
                <tr key={date}>
                    <th colSpan="6">{date}</th>
                    {/* Group header }
                    {entries.map((entry) => (
                        <tr key={entry.id}>
                            <td>{entry.username}</td>
                            <td>{entry.duration}</td>
                            <td>{entry.description}</td>
                            <td>{entry.notes}</td>
                        </tr>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>);
}
*/




// const filterTableByDate = (combinedEntries) => {
    // sortieren nach Datum
    // combinedEntries.sort((a, b) => {
    //     const dateA = new Date(a.date);
    //     const dateB = new Date(b.date);
    //     return dateA.getTime() - dateB.getTime();
    // });
    //
    // // nach Datum gruppieren
    // const groupedEntries = combinedEntries.reduce((acc, entry) => {
    //     const date = entry.date;
    //     if (!acc.hasOwnProperty(date)) {
    //         acc[date] = [];
    //     }
    //     acc[date].push(entry);
    //     return acc;
    // }, {});

    // Rendert JSX-Tabelle mit gruppierten Einträgen nach Datum sortiert
    // return (
    //     <table className="output-filed-table-datum">
    //         <thead className="output-filed-table-thead-datum">
    //         <tr>
    //             <th>Datum</th>
    //             <th>Person</th>
    //             <th>Zeit</th>
    //             <th>Beschreibung</th>
    //             <th>Notiz</th>
    //         </tr>
    //         </thead>
    //         <tbody className="output-filed-table-tbody-datum">
    //         {Object.entries(groupedEntries).map(([date, entries]) => (
    //             entries.map((entry, index) => (
    //                 <tr key={`${entry.id}-${index}`}>
    //                     {index === 0 && (
    //                         <th rowSpan={entries.length}>
    //                             {new Date(date).toLocaleDateString('de-DE')}
    //                         </th>
    //                     )}
    //                     <td>{entry.username}</td>
    //                     <td>{entry.duration}</td>
    //                     <td>{entry.description.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
    //                     <td>{entry.notes.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
    //                 </tr>
    //             ))
    //         ))}
    //         </tbody>
    //     </table>
    // );

// }


