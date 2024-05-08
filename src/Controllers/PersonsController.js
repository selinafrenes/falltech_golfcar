const {getTeamMembers} = require("../Models/db_access");

/**
 * Controller zur Abfrage der Teammitglieder.
 * @param {Object} req - Das Anfrageobjekt.
 * @param {Object} res - Das Antwortobjekt.
 */
const PersonsController = (req, res) => {
    getTeamMembers().then(r => {
        if (r.message) {
            // Fehler: Objekt hat .message
            res.status(500).json("Internal Server Error: Fehler beim Laden der Daten");
        } else {
            res.status(400).json(r);
        }
    }).catch(() => {
        res.status(500).json("Internal Server Error: Fehler beim Laden der Daten");
    });
}
module.exports = PersonsController;