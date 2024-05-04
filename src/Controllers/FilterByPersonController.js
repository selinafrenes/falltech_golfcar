const {getAllEntersFilterdByPersons} = require("../Models/db_access");

/**
 * Controller zur Auflistung aller Einträge sortiert und gruppiert nach Username.
 * @param {Object} req - Das Anfrageobjekt.
 * @param {Object} res - Das Antwortobjekt.
 */
const FilterByPersonController = (req, res) => {
    getAllEntersFilterdByPersons().then(r => {
        console.log("Result getAllEnters: " + JSON.stringify(r));
        res.status(200).json(r);
    }).catch((e) => {
        console.error(e.message);
        res.status(500).json(e.message);
    });
}
module.exports = FilterByPersonController;