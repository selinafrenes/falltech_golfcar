const {getAllEnters} = require("../Models/db_access");
const ListAllEntriesController = (req, res) => {
    getAllEnters().then(r => {
        console.log("Result getAllEnters: " + JSON.stringify(r));
        res.json(r);
    }).catch(error => {
        console.error("Fehler bei ex '/tagebuch.html/submit' jz '/tagebuch/entries': " + error.message);
        // res.status().json(error.message)
    });
}
module.exports = ListAllEntriesController;