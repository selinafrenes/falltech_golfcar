const {createNewEntry} = require("../Models/db_access");

/**
 * Controller zur Erstellung eines neuen Eintrags.
 * @param {Object} req - Das Anfrageobjekt.
 * @param {Object} res - Das Antwortobjekt.
 */
const NewEntryController = (req, res) => {
    const data = req.body;

    createNewEntry(data.people, data.description, data.notes, data.date, data.duration)
        .then(response => {
            console.log(response);
            res.status(201).json({ success: true });
        })
        .catch(() => {
            res.status(500).json({ success: false , message: "Internal server error: Fehler beim Abspeichern"});
        });
}
module.exports = NewEntryController;