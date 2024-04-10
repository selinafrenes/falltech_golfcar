const {createNewEntry} = require("../Models/db_access");

const NewEntryController = (req, res) => {
    const data = req.body;

    createNewEntry(data.people, data.description, data.notes, data.date, data.duration)
        .then(response => {
            console.log(response);
            // TODO response evt mit boolenan machen???
            res.status(201).json({ success: true });

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ success: false , message: "Internal server error"});
        });
}
module.exports = NewEntryController;