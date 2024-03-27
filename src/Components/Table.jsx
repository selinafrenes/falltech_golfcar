function Table(props){
    //      bezieh          einträge
    const { entersResult, entryResult } = props.data;

    const groupedEntries = entryResult.reduce((acc, entry) => {
        const date = entry.date;
        if (!acc.hasOwnProperty(date)) {
            acc[date] = [];
        }
        acc[date].push(entry);
        return acc;
    }, {});

    // entryResult.sort((a, b) => {
    //     const dateA = new Date(a.date);
    //     const dateB = new Date(b.date);
    //     return dateA.getTime() - dateB.getTime();
    // });

    for (const date in groupedEntries) {
        // const entries = groupedEntries[date];
        const e = groupedEntries[date];
        for (let i = 0; i < e; i++) {

        }
    }
    return(
        <div>
            {Object.keys(groupedEntries).map((date) => (
                <div key={date}>
                    <h2>{date}</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Beschreibung</th>
                            <th>Notizen</th>
                            <th>Dauer</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupedEntries[date].map((entry) => (
                            <tr key={entry.id}> {/* Use a unique identifier for each entry */}
                                <td>{entry.date}</td>
                                <td>{entry.description}</td>
                                <td>{entry.notes}</td>
                                <td>{entry.duration}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );

}

// <table>
//     <th>ID</th>
//     <th>Username</th>
//     {entersResult.map((relations) => (
//         <tr id={relations.id}>
//             <td>{relations.id}</td>
//             <td>{relations.username}</td>
//             {/*<p>{relations.content}</p>*/}
//         </tr>
//     ))}
// </table>
export default Table