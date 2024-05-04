// const {getAllEnters} = require("../Models/db_access");
//
// /**
//  * Controller zur Auflistung aller Einträge.
//  * @param {Object} req - Das Anfrageobjekt.
//  * @param {Object} res - Das Antwortobjekt.
//  */
// const ListAllEntriesController = (req, res) => {
//     getAllEnters().then(r => {
//         console.log("Result getAllEnters: " + JSON.stringify(r));
//         res.status(200).json(r);
//     }).catch(() => {
//         res.status(500).json("Internal Server Error")
//     });
// }
// module.exports = ListAllEntriesController;