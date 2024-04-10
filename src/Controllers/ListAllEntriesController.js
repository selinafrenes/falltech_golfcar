const {getAllEnters} = require("../Models/db_access");
const ListAllEntriesController = (req, res) => {
    getAllEnters().then(r => {
        console.log("Result getAllEnters: " + JSON.stringify(r));
        res.status(200).json(r);
    }).catch(() => {
        res.status(500).json("Internal Server Error")
    });
}
module.exports = ListAllEntriesController;