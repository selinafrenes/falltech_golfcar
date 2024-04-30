const _env = require('dotenv').config({path: __dirname + './../.env' });

console.log(_env);

const bcrypt = require("bcrypt");
console.log("-------1 " + process.env.DB_HOST);

// mysql2 unterstützt neuere async/await-Syntax und Promises für asynchrone Operationen
const pool = require('mysql2/promise').createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

/**
 * Authentifizierung eines Benutzers.
 * @param {string} username - Der Benutzername.
 * @param {string} userPassword - Das Passwort des Benutzers.
 * @returns {Promise<Object|boolean>} - Ein Objekt mit Benutzerdaten im Erfolgsfall, ansonsten false.
 */
const userAuthentication = async (username, userPassword) => {
    console.log(`userAuthentication(username: '${username}' password: '${userPassword}')`);
    let connection;
    try{
        console.log("--> try connection");
        connection = await pool.getConnection();
        if (!!username && !!userPassword){
            console.log("--> try select");
            const [results] = await connection.execute(
                'SELECT * FROM Person WHERE username = ?',
                [username]
            );
            const { password, ...data } = await results[0];
            // aktuell kann jeder username nur einmal genutzt werden!
            if (results[0] && bcrypt.compare(userPassword, password)) {
                // delete results[0].password;
                // console.log("results: " + results[0].username);
                return data;
            } else {
                return false;
            }
        }
    } catch(error) {
        throw error;
    } finally {
        if (connection) await connection.release();
    }
}

/**
 * Funktion zum Erstellen eines neuen Tagebucheintrags in der Datenbank.
 * @async
 * @param {Array<string>} people - Array von Benutzernamen, die dem Eintrag zugeordnet werden sollen.
 * @param {string} description - Beschreibung des Eintrags.
 * @param {string} [notes] - (Optional) Notizen zum Eintrag.
 * @param {string} date - Datum des Eintrags.
 * @param {number} duration - Dauer des Eintrags.
 * @returns {Promise<string>} - Eine Erfolgsmeldung, wenn die Operation erfolgreich war.
 * @throws {Error} - Ein Fehler, falls die Operation fehlschlägt.
 */
const createNewEntry = async (people, description, notes, date, duration) => {
    let connection
    try{
        connection = await pool.getConnection();

        // parametrisierte Abfrage → mehr Sicherheit
        const [results] = await connection.execute(
            'INSERT INTO Entry (description, notes, date, duration) VALUES (?, ?, ?, ?)',
            [connection.escape(description), connection.escape(notes),
                date, duration]
        );

        // Es dürfen keine weiteren DB-Anfragen zwischen result.insertId und dem vorherigen aufruf sein
        const id = results.insertId;
        for (const person of people) {
            const [r] = await connection.execute(
                'INSERT INTO Enters(id, username) VALUES (?, ?)', [id, person]
            );
            console.log('Datensatz in Enters eingefügt:', r);
        }
        return "Alle Datensätze wurden erfolgreich eingetragen!";
    } catch (error) {
        console.log(date, duration, description, notes, people);
        // res.json({ success: false , message: error.message});
        console.error('Fehler beim Erstellen des neuen Eintrags');
        throw error;
    } finally {
        if (connection) await connection.release();
    }
}

/**
 * Funktion zum Abrufen aller Teammitglieder aus der Datenbank.
 * @async
 * @returns {Promise<Array<Object>>} - Ein Array von Objekten, die die Teammitglieder darstellen.
 * @throws {Error} - Ein Fehler, falls die Operation fehlschlägt.
 */
const getTeamMembers = async() => {
    let connection;
    try{
        connection = await pool.getConnection();
        const [results] = await connection.execute(
            'SELECT * FROM Person WHERE teammember = 1;'
        );
        console.log("Result: " + results);
        return results;
    } catch(error) {
        return error;
    } finally {
        if (connection) await connection.release();
    }
}

/**
 * Funktion zum Abrufen aller Einträge aus dem Tagebuch aus der Datenbank.
 * @async
 * @returns {Promise<Object>} - Ein Objekt mit den Einträgen aus Enters und Entry-Tabellen.
 * @throws {Error} - Ein Fehler, falls die Operation fehlschlägt.
 */
const getAllEnters = async() => {
    let connection;
    try{
        connection = await pool.getConnection();
        const [entersResult] = await connection.execute(
            'SELECT * FROM Enters;'
        );
        const [entryResult] = await connection.execute(
            'SELECT * FROM Entry;'
        );
    return {entersResult, entryResult};
    } catch(error) {
        throw error;
    } finally {
        if (connection) await connection.release();
    }
}

// TODO TODO TODO TODO TODO TODO TODO
const getAllEntersFilterdByPersons = async() => {
    let connection;
    try{
        connection = await pool.getConnection();
        const [combinedResult] = await connection.execute(`
            SELECT 
                p.vorname,
                p.nachname,
                p.username,
                e.*,
                en.*
            FROM traegt_ein AS e
            LEFT JOIN Eintrag AS en ON e.id = en.id
            LEFT JOIN Person AS p ON en.username = p.username;
        `);
        return {combinedResult};
    } catch(error) {
        throw error;
    } finally {
        if (connection) await connection.release();
    }
}



module.exports = {
    userAuthentication,
    createNewEntry,
    getTeamMembers,
    getAllEnters
};


// TODO --> den Verbindungspool schließe
// pool.drain().then(() => pool.clear());