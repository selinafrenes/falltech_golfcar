const {userAuthentication} = require("../Models/db_access");

/**
 * Authentifizierungs-Controller, der den Benutzer anhand von Benutzername und Passwort authentifiziert.
 * @param {Object} req - Das Anfrageobjekt.
 * @param {Object} res - Das Antwortobjekt.
 */
const AuthController = (req, res) => {
    const { username, password } = req.body;
    userAuthentication(username, password)
        .then(response => {
            if (response && response.username){
                res.json({ success: true, data: response});
            } else {
                console.error("Es wurde kein Benutzer mit dem angegebenen Benutzername und Passwort gefunden!");
                res.status(401).json({ success: false, message: 'Unautorisiert: Benutzername oder Passwort falsch' });
            }
            res.send();
        })
        .catch(() => {
            res.status(500).json({ success: false, message: 'Interner Serverfehler: Anmeldeversuch fehlgeschlagen' });
        });
}
module.exports = AuthController;