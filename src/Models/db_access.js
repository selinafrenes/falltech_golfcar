
// +++ zuweisung variable _env, um dann z.b. mit console.log falschen pfad zu erkennen

// +++ absolut von root (startpfad) aus gesehen
// bei z.b. startpfad: node ./src/Controllers/server.js
// const _env = require('dotenv').config({path: './src/.env' });

// +++ relativ gesehen, mit __dirname
// TODO: auch noch bei Controllers/server.js
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
        console.error('Fehler beim Anmelden', error.message);

    } finally {
        if (connection) await connection.release();
    }
}

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