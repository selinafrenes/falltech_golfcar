const _env = require('dotenv').config({path: __dirname + '/../.env' });

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
 * @async
 * @param {string} username - Der Benutzername.
 * @param {string} userPassword - Das Passwort des Benutzers.
 * @returns {Promise<Object|boolean>} - Ein Objekt mit Benutzerdaten im Erfolgsfall, ansonsten false.
 * @throws {Error} Ein Fehler wird geworfen, wenn beim Authentifizieren ein Fehler auftritt.
 */
const userAuthentication = async (username, userPassword) => {
    console.log(`userAuthentication(username: '${username}' password: '${userPassword}')`);
    let connection;
    try{
        console.log("--> try connection");
        // Verbindung zur Datenbank herstellen
        connection = await pool.getConnection();

        // Überprüfen, ob Benutzername und Passwort vorhanden sind
        if (!!username && !!userPassword){
            console.log("--> try select");
            // Benutzer aus der Datenbank abrufen
            const [results] = await connection.execute(
                'SELECT * FROM Person WHERE username = ?',
                [username]
            );

            // Benutzerdaten und Passwort aus dem Ergebnis extrahieren
            const { password, ...data } = await results[0];

            console.log("Passwort: " + password + "__userpassword: " + userPassword);
            console.log("Result[0]: "+ results[0]);

            // Passwort mit dem gehashten Passwort in der Datenbank vergleichen
            const passwordMatch = await bcrypt.compare(userPassword, password);
            if (passwordMatch) {
                // Authentifizierung erfolgreich, Benutzerdaten zurückgeben
                return data;
            } else {
                // Falsches Passwort, Authentifizierung fehlgeschlagen
                return false;
            }
        }
    } catch(error) {
        throw error;
    } finally {
        // Verbindung freigeben, wenn sie vorhanden ist
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
        // Verbindung zur Datenbank herstellen
        connection = await pool.getConnection();

        // Parametrisierte Abfrage für mehr Sicherheit
        const [results] = await connection.execute(
            'INSERT INTO Entry (description, notes, date, duration) VALUES (?, ?, ?, ?)',
            [connection.escape(description), connection.escape(notes),
                date, duration]
        );

        // Es dürfen keine weiteren DB-Anfragen zwischen result.insertId und dem vorherigen aufruf sein
        // ID des neuen Eintrags abrufen
        const id = results.insertId;

        // Benutzer zu diesem Eintrag hinzufügen
        for (const person of people) {
            const [r] = await connection.execute(
                'INSERT INTO Enters(id, username) VALUES (?, ?)', [id, person]
            );
        }
        return "Alle Datensätze wurden erfolgreich eingetragen!";
    } catch (error) {
        throw error;
    } finally {
        // Verbindung freigeben, wenn sie vorhanden ist
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
        // Verbindung zur Datenbank herstellen
        connection = await pool.getConnection();

        // Teammitglieder aus der Datenbank abrufen
        const [results] = await connection.execute(
            'SELECT * FROM Person WHERE teammember = 1;'
        );
        return results;
    } catch(error) {
        return error;
    } finally {
        // Verbindung freigeben, wenn sie vorhanden ist
        if (connection) await connection.release();
    }
}

/**
 * Funktion zum Abrufen der gesamten Arbeitszeit pro Benutzer aus der Datenbank.
 * @async
 * @returns {Promise<Array<{Username: string, TotalDuration: number}>>} Ein Array von Objekten,
 *          das die Benutzernamen und ihre gesamte Arbeitszeit enthält.
 * @throws {Error} Ein Fehler, der während der Ausführung der Datenbankabfrage auftritt.
 */
const getTotalWorkingTime = async() => {
    let connection;
    try{
        // Verbindung zur Datenbank herstellen
        connection = await pool.getConnection();

        // SQL-Abfrage zum Abrufen der Einträge gruppiert nach Personen ausführen
        const [time] = await connection.execute(`
            SELECT p.Username, SUM(e.Duration) AS TotalDuration
            FROM Person p
            JOIN Enters en ON p.Username = en.Username
            JOIN Entry e ON en.ID = e.ID
            GROUP BY p.Username;
        `);

        // Die gefilterten und gruppierten Einträge zurückgeben
        return time;
    } catch(error) {
        throw error;
    } finally {
        // Verbindung freigeben, wenn sie vorhanden ist
        if (connection) await connection.release();
    }
}

/**
 * Funktion zum Abrufen aller Einträge, gruppiert nach Personen.
 * @async
 * @returns {Promise<Array<Object>>} Ein Promise-Objekt, das ein Array von Objekten zurückgibt.
 * Jedes Objekt im Array repräsentiert eine Person und ihre Einträge.
 * @throws {Error} Ein Fehler wird geworfen, wenn beim Abrufen der Daten ein Fehler auftritt.
 */
const getAllEntersFilterdByPersons = async() => {
    let connection;
    try{
        // Verbindung zur Datenbank herstellen
        connection = await pool.getConnection();

        // SQL-Abfrage zum Abrufen der Einträge gruppiert nach Personen ausführen
        const [combinedResult] = await connection.execute(`
            SELECT p.username, GROUP_CONCAT('{"description":"', e.description, '","notes":"', e.notes, '", "date":"', e.date, '","duration":"', e.duration, '"}') AS eintraege
            FROM Person p
            INNER JOIN Enters te ON p.username = te.username
            INNER JOIN Entry e ON te.id = e.id
            GROUP BY p.username;
        `);

        // Einträge in JSON-Format konvertieren
        for (let i = 0; i < combinedResult.length; i++) {
            combinedResult[i].eintraege =  "[" + combinedResult[i].eintraege + "]";
        }

        // Die gefilterten und gruppierten Einträge zurückgeben
        return combinedResult;
    } catch(error) {
        throw error;
    } finally {
        // Verbindung freigeben, wenn sie vorhanden ist
        if (connection) await connection.release();
    }
}

/**
 * Funktion zum Abrufen aller Einträge, gruppiert nach Datum.
 * @async
 * @returns {Promise<Array<Object>>} Ein Promise-Objekt, das ein Array von Objekten zurückgibt.
 * Jedes Objekt im Array repräsentiert ein Datum und seine zugehörigen Einträge.
 * @throws {Error} Ein Fehler wird geworfen, wenn beim Abrufen der Daten ein Fehler auftritt.
 */
const getAllEntersFilterdByDate = async() => {
    let connection;
    try{
        // Verbindung zur Datenbank herstellen
        connection = await pool.getConnection();

        // SQL-Abfrage zum Abrufen der Einträge gruppiert nach Datum ausführen
        const [combinedResult] = await connection.execute(`
            SELECT e.date, GROUP_CONCAT('{"person":"', p.username, '","description":"', e.description, '","notes":"', e.notes, '" ,"duration":"', e.duration, '"}') AS eintraege
            FROM Person p
            INNER JOIN Enters te ON p.username = te.username
            INNER JOIN Entry e ON te.id = e.id
            GROUP BY e.date
            ORDER BY e.date DESC;
        `);

        // Einträge in JSON-Format konvertieren
        for (let i = 0; i < combinedResult.length; i++) {
            combinedResult[i].eintraege =  "[" + combinedResult[i].eintraege + "]";
        }

        // Die gefilterten und gruppierten Einträge zurückgeben
        return combinedResult;
    } catch(error) {
        throw error;
    } finally {
        // Verbindung freigeben, wenn sie vorhanden ist
        if (connection) await connection.release();
    }
}


module.exports = {
    userAuthentication,
    createNewEntry,
    getTeamMembers,
    getAllEntersFilterdByPersons,
    getAllEntersFilterdByDate,
    getTotalWorkingTime
};


// TODO --> den Verbindungspool schließe
// pool.drain().then(() => pool.clear());