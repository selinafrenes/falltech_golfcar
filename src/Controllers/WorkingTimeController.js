const {getTotalWorkingTime} = require("../Models/db_access");
// TODO yxc kommi
const WorkingTimeController = (req, res) => {
    getTotalWorkingTime()
        .then(response => {
            console.log("RESPONSE: " + JSON.stringify(response));
            res.json({response});
            const r = JSON.parse(response);
            let time = 0;
            for (let i = 0; i < r.length; i++) {
                time += r[i].TotalDuration;
            }
            res.status(200).json({totalTime: time})
        })
        .catch((e) => {
            res.status(500).json({ success: false, message: e.message });
            //res.status(500).json({ success: false, message: 'Interner Serverfehler: Anmeldeversuch fehlgeschlagen' });
        });
}
module.exports = WorkingTimeController;