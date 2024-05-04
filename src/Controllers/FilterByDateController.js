const {getAllEntersFilterdByDate} = require("../Models/db_access");

/**
 * Controller zur Auflistung aller Einträge sortiert und gruppiert nach Datum.
 * @param {Object} req - Das Anfrageobjekt.
 * @param {Object} res - Das Antwortobjekt.
 */
const FilterByDateController = (req, res) => {
    getAllEntersFilterdByDate().then(r => {
        console.log("Result getAllEnters: " + JSON.stringify(r));
        res.status(200).json(r);
    }).catch((e) => {
        console.error(e.message);
        res.status(500).json(e.message);
    });
}
module.exports = FilterByDateController;