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
        data.data.map(user => (
            <table className="output-filed-table">
                <Fragment key={user.username}>
                    {
                        <thead className="output-filed-table-thead">
                        <th className="tableHeader" colSpan={4}>
                            {user.username}
                        </th>
                        <tr>
                            <th>Datum</th>
                            <th>Zeit</th>
                            <th>Beschreibung</th>
                            <th>Notizen</th>
                        </tr>
                        </thead>
                    }

                    {<tbody className="output-filed-table-tbody">
                    {JSON.parse(user.eintraege) !== null &&
                        JSON.parse(user.eintraege).map((entry) => (
                            <tr key={"_" + entry.id + "_" + entry.date + "_" + entry.duration}>
                                <td>{new Date(entry.date).toLocaleDateString('de-DE')}</td>
                                <td>{entry.duration}</td>
                                <td>{entry.description.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
                                <td>{entry.notes.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </Fragment>
            </table>
        ))
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
            data.data.map(e => (
            <table className="output-filed-table">
                <Fragment key={new Date(e.date).toLocaleDateString('de-DE')}>
                    {
                        <thead className="output-filed-table-thead">
                        <th colSpan={4}>
                            {new Date(e.date).toLocaleDateString('de-DE')}
                        </th>
                        <tr>
                            <th>Person</th>
                            <th>Zeit</th>
                            <th>Beschreibung</th>
                            <th>Notizen</th>
                        </tr>
                        </thead>

                    }
                    <tbody className="output-filed-table-tbody">
                    {JSON.parse(e.eintraege).map((entry) => (
                        <tr key={"_" + entry.person + "_" + entry.id + "_" + entry.duration}>
                            <td>{entry.person}</td>
                            <td>{entry.duration}</td>
                            <td>{entry.description.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
                            <td>{entry.notes.replaceAll(/'/g, '').replaceAll(/\\n/g, ' ')}</td>
                        </tr>
                    ))}
                    </tbody>
                </Fragment>
            </table>
            ))
    )
};

export default Table;