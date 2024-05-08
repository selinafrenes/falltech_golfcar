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

app.get('/controls', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'control_website.html'));
});

app.post('/api/v1/diary/entries', function (req, res){
    NewEntryController(req, res);
});

// Routen-Handler für das Überprüfen des Passworts
app.post('/api/v1/auth/login', (req, res) => {
    AuthController(req, res);
});

app.get('/api/v1/users', (req, res) => {
    PersonsController(req, res);
});

app.get('/api/v1/diary/entries/grouped-by-user', (req, res) => {
    FilterByPersonController(req, res);
    // FilterByPersonController(req, res);
});

app.get('/api/v1/diary/entries/grouped-by-date', (req, res) => {
    FilterByDateController(req, res);
});

app.get('/api/v1/statistics/work-time', (req, res) => {
    WorkingTimeController(req, res);
});

// Beim Reloaden der Webseite, wenn man sich auf einem Unterpfad befindet
app.get('/*', function (req, res){
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
