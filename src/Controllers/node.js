const express = require('express');
const app = express(); //Endpunkt erstellen
require('dotenv').config({ path: '../.env' });
const port = process.env.PORT || 8000; //process.env.PORT -> Was sich in der Envirement Variable befindet
const bodyParser = require('body-parser');
require('cookie-parser'); // Um Cookies zu setzten
const fs = require("fs");
const path = require('path');
const cors = require("cors");
const {userAuthentication, createNewEntry, getTeamMembers, getAllEnters} = require("../Models/db_access");


//Api Middlewares
app.use(express.json()); //um Daten in JSON zu erlauben
app.use(express.urlencoded()); //Um die JSON Daten zu decode


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Den Pfad zu den Dateien festlegen (damit die CSS Datei auch mit gesendet wird)
// app.use(express.static(path.join(__dirname, '..')));    // Kontrollieren ob richtig!
app.use(express.static(path.join(__dirname, 'build')));

// damit man auf anderen port zugreifen kann
app.use(cors());

//Routen setzten
app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.get('/index', function (req, res){
//     console.log("aktueller Path!!!: " + path.join(__dirname, '..', 'Views', 'index.html'));
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
//
// app.get('/tagebuch', function (req, res){
//     const p = path.join(process.cwd(), '..', 'Views', 'tagebuch.html');
//     console.log("Tagebuc pfad: " + p);
//     res.sendFile(p);
// });

// <form action="http://localhost:8000/tagebuch.html/submit" className="filter and search" method="get">


app.post('/tagebuch.html/submit', function (req, res){

    console.log("currenty in : '/tagebuch.html/submit'");
    const data = req.body;

    // TODO strings validieren und prüfen ob keine SQL Befehle sind!

    createNewEntry(data.people, data.description, data.notes, data.date, data.duration)
        .then(response => {
            console.log(response);
            // res.redirect('/tagebuch');
            res.json({ success: true });

        })
        .catch(error => {
            console.log(error);
            // res.redirect('/tagebuch');
            res.json({ success: false , message: error.message});

        });
    //Antwort senden
    // TODO antwort senden!
    //res.json({message: 'Daten wurden erhalten!'});
    console.log("Daten erhalten!!!");

});

//LOGIN ZUM TAGEBUCH
/*
app.post('/index.html/login', function (req, res){
    const loginDaten = req.body;
    console.log(loginDaten);
    res.sendFile(__dirname + '/tagebuch.html');
    console.log("LOGIN!!!");
});
 */

// Routen-Handler für das Überprüfen des Passworts
/**
 * Route, die den Login-Prozess auf '/index.html/login' handhabt.
 *
 * @param {object} req - Das Request-Objekt, das die Anfrageinformationen enthält.
 * @param {object} res - Das Response-Objekt, das verwendet wird, um eine Antwort an den Client zu senden.
 *
 * Extrahiert den Benutzernamen und das Passwort aus dem Anfragekörper und führt eine Authentifizierung durch.
 * Bei erfolgreicher Authentifizierung wird ein Cookie gesetzt und der Benutzer wird zum Tagebuch umgeleitet.
 * Bei fehlgeschlagener Authentifizierung wird eine Fehlermeldung protokolliert und der Benutzer wird zur Index-Seite umgeleitet.
 *
 * @route POST /index.html/login
 */
app.post('/index.html/login', (req, res) => {
    const { username, password } = req.body;
    console.log("UN, PW: " + username + password);
    console.log("Process.cwd " + process.cwd());
    userAuthentication(username, password)
        .then(response => {
            if (response){
                // TODO Cookie evt wieder löschen (logout) und automatisch anmelden?
                // Cookie setzten
                res.cookie('username', username, {maxAge: 24*60*60*1000}); // Cookie ist ein Tag gültig
                //res.redirect('/tagebuch');
                res.json({ success: true });
                // res.status(200).json({ message: username });
            } else {
                // TODO Benutzer anzeigen, dass Eingabe falsch war
                console.error("Es wurde kein Benutzer mit dem angegebenen Benutzername und Passwort gefunden!")
                res.json({ success: false, message: 'Login fehlgeschlagen' });
                // res.status(403).json({ message: 'Nicht autorisiert' });
            }
        })
        .catch(error => {
            console.error('Fehler beim Aufrufen der userAuthentication-Funktion:', error);
            // res.status(403).json({ message: 'Nicht autorisiert' });
        });
});


app.get('/tagebuch/entries', (req, res) => {
    getAllEnters().then(r => {
        console.log("Result getAllEnters: " + JSON.stringify(r));
        res.json(r);

        // loadEnters(r.entersResult, r.entryResult);
    }).catch(error => {
        console.error("Fehler bei ex '/tagebuch.html/submit' jz '/tagebuch/entries': " + error.message);
    });
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
