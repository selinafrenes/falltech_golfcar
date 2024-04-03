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
    const { entersResult, entryResult } = props.data;
    const combinedEntries = [];

    for (let i = 0; i < entersResult.length; i++) {
        const e = entersResult[i];
        const res = entryResult.find((entry) => entry.id === e.id);
        const result = {
            username: entersResult[i].username,
            id: res.id,
            description: res.description,
            notes: res.notes,
            date: res.date,
            duration: res.duration
        }
        combinedEntries.push(result);
    }


    return(
        <>
            {props.filter ? filterTableByUsername(combinedEntries) : filterTableByDate(combinedEntries)}
        </>
    );
}

/**
 * Filtert und organisiert kombinierte Einträge nach Benutzernamen, gruppiert sie und sortiert sie dann nach Datum.
 * @param {Array} combinedEntries - Die kombinierten Einträge enthalten Daten für mehrere Benutzer.
 * @returns {JSX.Element} - JSX-Element, das eine Tabelle darstellt, in der gefilterte und sortierte Einträge angezeigt werden.
 */
const filterTableByUsername = (combinedEntries) => {
    // Gruppiert alle Einträge nach Username
    const groupedEntries = combinedEntries.reduce((acc, entry) => {
        // debugger;
        const username = entry.username;
        if (!acc.hasOwnProperty(username)) {
            acc[username] = [];
        }
        acc[username].push(entry);
        return acc;
    }, {});

    // Sortiert alle Einträge innerhalb des Users nach Datum
    for (const groupedEntry in groupedEntries) {
        //debugger;
        groupedEntries[groupedEntry].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA.getTime() - dateB.getTime();
        });
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
            {Object.entries(groupedEntries).map(([username, entries]) => (
                <Fragment key={username}>
                    <tr>
                        <th rowSpan={entries.length+1}>{username}</th>{/*TODO Warum +1*/}
                    </tr>
                    {entries.map((entry) => (
                        <tr key={entry.id}>
                            <td>{new Date(entry.date).toLocaleDateString('de-DE')}</td>
                            <td>{entry.duration}</td>
                            <td>{entry.description.replace(/'/g, '').replace(/\n/g, '')}</td>
                            <td>{entry.notes.replace(/'/g, '').replace(/\n/g, '')}</td>
                        </tr>
                    ))}
                </Fragment>
            ))}
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
    return (
        <table className="output-filed-table-datum">
            <thead className="output-filed-table-thead-datum">
            <tr>
                <th>Datum</th>
                <th>Person</th>
                <th>Zeit</th>
                <th>Beschreibung</th>
                <th>Notiz</th>
            </tr>
            </thead>
            <tbody className="output-filed-table-tbody-datum">
            {Object.entries(groupedEntries).map(([date, entries]) => (
                entries.map((entry, index) => (
                    <tr key={`${entry.id}-${index}`}>
                        {index === 0 && (
                            <th rowSpan={entries.length}>
                                {new Date(date).toLocaleDateString('de-DE')}
                            </th>
                        )}
                        <td>{entry.username}</td>
                        <td>{entry.duration}</td>
                        <td>{entry.description.replace(/'/g, '').replace(/\n/g, '<br>')}</td>
                        <td>{entry.notes.replace(/'/g, '').replace(/\n/g, '<br>')}</td>
                    </tr>
                ))
            ))}
            </tbody>
        </table>
    );

}


export default Table