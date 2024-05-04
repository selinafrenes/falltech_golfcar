const {getTeamMembers} = require("../Models/db_access");

// TODO wegtian? weil werd nia verwendet!
/**
 * Controller zur Abfrage der Teammitglieder.
 * @param {Object} req - Das Anfrageobjekt.
 * @param {Object} res - Das Antwortobjekt.
 */
const PersonsController = (req, res) => {
    getTeamMembers().then(r => {
        if (r.message) {
            console.log("Fehler --> Objekt hat .message");
            res.status(500).json(r);
        } else {
            console.log("Kein Fehler --> Objekt hat nicht .message");
            res.status(400).json(r);
        }
    });
}
module.exports = PersonsController;