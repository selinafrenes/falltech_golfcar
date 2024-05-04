import React, {Fragment} from 'react';

/**
 * Eine Tabelle zum Anzeigen von Tagebucheinträgen.
 * @param {Object} props - Die Eigenschaften (Props) der Tabelle.
 * @param {Object[]} props.data - Die Daten der Einträge.
 * @param {boolean} props.filter - Der Filterwert für die Tabelle.
 * @returns {JSX.Element} Die gerenderte Table-Komponente.
 */
function Table(props){
    return(
        <>
            {props.filter ? filterTableByUsername(props) : filterTableByDate(props)}
        </>
    )
}

/**
 * Rendert eine Tabelle mit gruppierten und sortierten Einträgen nach Benutzername.
 * @param {Object} data - Die Daten der Einträge.
 * @param {Object[]} data.data - Die Daten der Einträge.
 * @param {string} data.data[].username - Der Benutzername.
 * @param {string} data.data[].eintraege - Die Einträge des Benutzers als JSON-String.
 * @returns {JSX.Element} Die gerenderte Tabelle.
 */
const filterTableByUsername = (data) => {
    // Rendert JSX-Tabelle mit gruppierten und sortierten Einträgen
    return (
        <table className="output-filed-table">
            <thead className="output-filed-table-thead">
            <tr>
                <th>Person</th>
                <th>Datum</th>
                <th>Zeit</th>
                <th>Beschreibung</th>
                <th>Notizen</th>
            </tr>
            </thead>
            <tbody className="output-filed-table-tbody">
            {data.data.map(user => (
                <Fragment key={user.username}>
                    {
                        <th className="tableHeader" rowSpan={JSON.parse(user.eintraege).length +1}>
                            {user.username}
                        </th>
                    }
                    {JSON.parse(user.eintraege) !== null &&
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




/**
 * Rendert eine Tabelle mit gruppierten und sortierten Einträgen nach Datum.
 * @param {Object} data - Die Daten der Einträge.
 * @param {Object[]} data.data - Die Daten der Einträge.
 * @param {string} data.data[].date - Das Datum der Einträge.
 * @param {string} data.data[].eintraege - Die Einträge des Datums als JSON-String.
 * @returns {JSX.Element} Die gerenderte Tabelle.
 */
const filterTableByDate = (data) => {
    // Rendert JSX-Tabelle mit gruppierten und sortierten Einträgen
    return (
        <table className="output-filed-table">
            <thead className="output-filed-table-thead">
            <tr>
                <th>Datum</th>
                <th>Person</th>
                <th>Zeit</th>
                <th>Beschreibung</th>
                <th>Notizen</th>
            </tr>
            </thead>
            <tbody className="output-filed-table-tbody">
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