const {getTotalWorkingTime} = require("../Models/db_access");

/**
 * Controller-Funktion zum Abrufen der Gesamtarbeitszeit und Senden der Antwort an den Client.
 * @param {Object} req - Das Anfrageobjekt.
 * @param {Object} res - Das Antwortobjekt.
 */
const WorkingTimeController = (req, res) => {
    getTotalWorkingTime()
        .then(response => {
            let time = 0;
            for (const r of response) {
                time += r.TotalDuration;
            }
            res.status(200).json({totalTime: time})
        })
        .catch(() => {
            res.status(500).json({message: "Internal Server Error: Fehler beim Laden der Daten"});
            //res.status(500).json({ success: false, message: 'Interner Serverfehler: Anmeldeversuch fehlgeschlagen' });
        });
}
module.exports = WorkingTimeController;