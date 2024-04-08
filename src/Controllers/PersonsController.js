const {getTeamMembers} = require("../Models/db_access");
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
    // const data = req.body;
    //
    // createNewEntry(data.people, data.description, data.notes, data.date, data.duration)
    //     .then(response => {
    //         console.log(response);
    //         // res.redirect('/tagebuch');
    //         res.json({ success: true });
    //
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         // res.redirect('/tagebuch');
    //         res.json({ success: false , message: error.message});
    //
    //     });
}
module.exports = PersonsController;