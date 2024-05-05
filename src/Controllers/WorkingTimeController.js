const {getTotalWorkingTime} = require("../Models/db_access");
// TODO yxc kommi
const WorkingTimeController = (req, res) => {
    getTotalWorkingTime()
        .then(response => {
            let time = 0;
            for (const r of response) {
                console.log(r);
                if (r.TotalDuration) console.log("TRUEEEEE");
                else console.log("FALSEEEEEEEEEEEEEEE");
                time += r.TotalDuration;
            }

            res.status(200).json({totalTime: time})
        })
        .catch((e) => {
            res.status(500).json({ success: false, message: e.message });
            //res.status(500).json({ success: false, message: 'Interner Serverfehler: Anmeldeversuch fehlgeschlagen' });
        });
}
module.exports = WorkingTimeController;