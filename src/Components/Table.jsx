function Table(props){
    //      bezieh          einträge
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


    return(
        <>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Duration</th>
                    <th>Description</th>
                    <th>Notes</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(groupedEntries).map(([date, entries]) => (
                    <tr key={date}>
                        <th colSpan="6">{date}</th>
                        {/* Group header */}
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
            </table>
        </>
    );

}


export default Table