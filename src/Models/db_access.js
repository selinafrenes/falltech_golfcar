
// +++ zuweisung variable _env, um dann z.b. mit console.log falschen pfad zu erkennen

// +++ absolut von root (startpfad) aus gesehen
// bei z.b. startpfad: node ./src/Controllers/node.js
// const _env = require('dotenv').config({path: './src/.env' });

// +++ relativ gesehen, mit __dirname
// TODO: auch noch bei Controllers/node.js
const _env = require('dotenv').config({path: __dirname + './../.env' });

console.log(_env); // +++

const bcrypt = require("bcrypt");
// mysql2 unterstützt neuere async/await-Syntax und Promises für asynchrone Operationen
const pool = require('mysql2/promise').createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

/**
 * Authentifiziert einen Benutzer durch Überprüfung des Benutzernamens und des Passworts in der Datenbank.
 *
 * @async
 * @function userAuthentication
 * @param {string} username - Der Benutzername des Benutzers.
 * @param {string} password - Das Passwort des Benutzers.
 * @returns {Promise<string>} Gibt den Benutzernamen zurück, wenn die Authentifizierung erfolgreich ist.
 * @throws {Error} Wirft einen Fehler mit einer Nachricht, wenn der Benutzername oder das Passwort falsch ist oder ein anderer Fehler auftritt.
 */
const userAuthentication = async (username, password) => {
    console.log(`userAuthentication(username: '${username}' password: '${password}')`);
    let connection;
    try{
        console.log("--> try connection");
        connection = await pool.getConnection();
        if (!!username && !!password){
            console.log("--> try select");
            const [results] = await connection.execute(
                'SELECT password FROM Person WHERE username = ?',
                [username]
            );
            return await bcrypt.compare(password, results[0].password);
        }
    } catch(error) {
        console.error('Fehler beim Anmelden', error.message);
    } finally {
        if (connection) await connection.release();
    }
}

/**
 * Erstellt einen neuen Eintrag in der 'Entry'-Tabelle und verknüpft ihn mit Personen in der 'Enters'-Tabelle.
 *
 * @async
 * @function createNewEntry
 * @param {string[]} people - Eine Liste von Benutzernamen, die mit dem Eintrag verknüpft werden sollen.
 * @param {string} description - Die Beschreibung des Eintrags.
 * @param {string} notes - Zusätzliche Notizen zum Eintrag.
 * @param {string} date - Das Datum des Eintrags im Format 'YYYY-MM-DD'.
 * @param {string} duration - Die Dauer des Eintrags.
 * @returns {Promise<string>} Eine Nachricht, die bestätigt, dass alle Datensätze erfolgreich eingetragen wurden.
 * @throws {Error} Wirft einen Fehler, wenn beim Erstellen des Eintrags oder beim Verknüpfen mit Personen ein Problem auftritt.
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
        console.error('Fehler beim Erstellen des neuen Eintrags:', error.message);
        throw error;
    } finally {
        if (connection) await connection.release();
    }
}

// get Personen (nur Members)
const getTeamMembers = async() => {
    let connection;
    try{
        connection = await pool.getConnection();
        const [results] = await connection.execute(
            'SELECT * FROM Person WHERE teammember = 1;'
        );
        console.log("Result: " + results);

    } catch(error) {
        console.error('Fehler beim Zurückgeben von Teammembers', error.message);
    } finally {
        if (connection) await connection.release();
    }
}

//get-Tagebuch alle Einträge
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
        console.error('Fehler beim Zurückgeben von den Enters', error.message);
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