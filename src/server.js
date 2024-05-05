const express = require('express');
const app = express(); //Endpunkt erstellen
require('dotenv').config({ path: '../.env' });
const port = process.env.PORT || 8000; //process.env.PORT -> Was sich in der Envirement Variable befindet
const bodyParser = require('body-parser');
require('cookie-parser'); // Um Cookies zu setzten
const path = require('path');
const cors = require("cors");
const NewEntryController = require("./Controllers/NewEntryController");
const AuthController = require("./Controllers/AuthController");
const PersonsController = require("./Controllers/PersonsController");
const FilterByPersonController = require("./Controllers/FilterByPersonController");
const FilterByDateController = require("./Controllers/FilterByDateController");
const WorkingTimeController = require("./Controllers/WorkingTimeController");


//Api Middlewares
app.use(express.json()); //um Daten in JSON zu erlauben
app.use(express.urlencoded()); //Um die JSON Daten zu decode

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Den Pfad zu den Dateien festlegen (damit die CSS Datei auch mit gesendet wird)
app.use(express.static(path.join(__dirname, '..', 'build')));

// damit man auf anderen port zugreifen kann
app.use(cors());

//Routen setzten
app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, 'build', '..', 'index.html'));
});

app.post('/tagebuch/submit', function (req, res){
    NewEntryController(req, res);
});

// Routen-Handler für das Überprüfen des Passworts
app.post('/login', (req, res) => {
    AuthController(req, res);
});

// app.get('/tagebuch/eintraege', (req, res) => {
//     ListAllEntriesController(req, res);
// });

app.get('/personen', (req, res) => {
    PersonsController(req, res);
});

app.get('/tagebuch/eintraege/personen', (req, res) => {
    FilterByPersonController(req, res);
    // FilterByPersonController(req, res);
});

app.get('/tagebuch/eintraege/datum', (req, res) => {
    FilterByDateController(req, res);
});

app.get('/tagebuch/totalworkingtime', (req, res) => {
    WorkingTimeController(req, res);
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
