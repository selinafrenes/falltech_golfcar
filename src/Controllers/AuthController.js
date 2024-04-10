const {userAuthentication} = require("../Models/db_access");
const AuthController = (req, res) => {
    const { username, password } = req.body;
    userAuthentication(username, password)
        .then(response => {
            if (response && response.username){
                console.log("response --> " + response)
                // TODO Cookie evt wieder setzten und bei client löschen (logout) und automatisch anmelden?
                // res.cookie()
                // res.cookie('username', username, { maxAge: 24*60*60*1000, path: '/', domain: 'localhost' });
                res.json({ success: true, data: response});
            } else {
                // TODO Benutzer anzeigen, dass Eingabe falsch war
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