const {getTotalWorkingTime} = require("../Models/db_access");
const WorkingTimeController = (req, res) => {
    getTotalWorkingTime()
        .then(response => {
            console.log("RESPONSE: " + JSON.stringify(response));
            res.json({response});
                // res.json({ success: true, data: response});
            // res.status(401).json({ success: false, message: 'Unautorisiert: Benutzername oder Passwort falsch' });

        })
        .catch((e) => {
            res.status(500).json({ success: false, message: e.message });
            //res.status(500).json({ success: false, message: 'Interner Serverfehler: Anmeldeversuch fehlgeschlagen' });
        });
}
module.exports = WorkingTimeController;