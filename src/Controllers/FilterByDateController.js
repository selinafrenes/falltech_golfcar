const {getAllEntersFilterdByDate} = require("../Models/db_access");

/**
 * Controller zur Auflistung aller Einträge sortiert und gruppiert nach Datum.
 * @param {Object} req - Das Anfrageobjekt.
 * @param {Object} res - Das Antwortobjekt.
 */
const FilterByDateController = (req, res) => {
    getAllEntersFilterdByDate().then(r => {
        res.status(200).json(r);
    }).catch(() => {
        res.status(500).json("Internal Server Error: Fehler beim Holen der Daten");
    });
}
module.exports = FilterByDateController;