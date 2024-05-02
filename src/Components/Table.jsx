import React, { Fragment } from 'react';

/**
 * Komponente zur Darstellung einer Tabelle basierend auf den übergebenen Daten.
 * Die Tabelle kann entweder nach Benutzername oder nach Datum gefiltert und organisiert werden.
 * @param {object} props - Die Eigenschaften, die der Tabelle übergeben werden.
 * @param {object} props.data - Objekt, das die Daten für die Tabelle enthält.
 * @param {Array} props.data.entersResult - Einträge zur Darstellung in der Tabelle.
 * @param {Array} props.data.entryResult - Zusätzliche Informationen für die Einträge.
 * @param {string} [props.filter] - Optionaler Parameter, der angibt, ob die Tabelle nach Benutzername oder Datum gefiltert werden soll.
 * @returns {JSX.Element} - JSX-Element zur Darstellung der Tabelle.
 */
function Table(props){

    return(
        <>
            {filterTableByUsername(props.data)}
            {/*{props.filter ? filterTableByUsername(props.data) : filterTableByDate(props.data)}*/}
        </>
    );
}

/**
 * Filtert die übergebenen Daten nach Benutzernamen und rendert eine JSX-Tabelle mit den gruppierten und sortierten Einträgen.
 * @param {Array.<{ username: string, eintraege: Array.<{ date: string, duration: string, description: string, notes?: string }> }>} data - Die Daten, die nach Benutzernamen gefiltert werden sollen.
 * @returns {JSX.Element} - JSX-Element, das eine Tabelle mit den gruppierten und sortierten Einträgen darstellt.
 */
const filterTableByUsername = (data) => {
    for (let i = 0; i < data.length; i++) {
        data[i].eintraege = JSON.parse(data[i].eintraege);
    }

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
            {data.map(user => (
                <Fragment key={user.username}>
                <tr>
                <th rowSpan={user.eintraege.length+1}>{user.username}</th>{/*TODO Warum +1*/}
                </tr>
                {user.eintraege.map((entry) => (
                    <tr key={entry.description}>
                        <td>{new Date(entry.date).toLocaleDateString('de-DE')}</td>
                        <td>{entry.duration}</td>
                        <td>{entry.description.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
                        <td>{entry.notes.replaceAll(/'/g, '').replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
                    </tr>
                    ))};
                </Fragment>

            ))}


            {/*TODO ausgeben*/}
            </tbody>
        </table>
    )

    };

/**
 * Filtert und organisiert kombinierte Einträge nach Datum, sortiert sie chronologisch und gruppiert sie nach Datum.
 * @param {Array} combinedEntries - Die kombinierten Einträge enthalten Daten für mehrere Datumswerte.
 * @returns {JSX.Element} - JSX-Element, das eine Tabelle darstellt, in der gefilterte und nach Datum sortierte Einträge angezeigt werden.
 */
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


export default Table