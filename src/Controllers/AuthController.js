const {userAuthentication} = require("../Models/db_access");
const AuthController = (req, res) => {
    const { username, password } = req.body;
    console.log("UN, PW: " + username + password);
    console.log("Process.cwd " + process.cwd());
    userAuthentication(username, password)
        .then(response => {
            if (response){
                // TODO Cookie evt wieder setzten und bei client löschen (logout) und automatisch anmelden?
                // res.cookie()
                // res.cookie('username', username, { maxAge: 24*60*60*1000, path: '/', domain: 'localhost' });
                res.json({ success: true });
            } else {
                // TODO Benutzer anzeigen, dass Eingabe falsch war
                console.error("Es wurde kein Benutzer mit dem angegebenen Benutzername und Passwort gefunden!")
                res.json({ success: false, message: 'Login fehlgeschlagen' });
                // res.status(403).json({ message: 'Nicht autorisiert' });
            }
            res.send();
        })
        .catch(error => {
            console.error('Fehler beim Aufrufen der userAuthentication-Funktion:', error);
        });
}
module.exports = AuthController;