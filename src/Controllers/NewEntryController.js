const {createNewEntry} = require("../Models/db_access");

const NewEntryController = (req, res) => {
    const data = req.body;

    createNewEntry(data.people, data.description, data.notes, data.date, data.duration)
        .then(response => {
            console.log(response);
            // res.redirect('/tagebuch');
            res.json({ success: true });

        })
        .catch(error => {
            console.log(error);
            // res.redirect('/tagebuch');
            res.json({ success: false , message: error.message});

        });
}
module.exports = NewEntryController;