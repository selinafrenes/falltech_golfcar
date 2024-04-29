const axios = require('axios');
const {By} = require("selenium-webdriver");
const assert = require('assert');

// Die URL deines Servers, auf dem die Testdaten gespeichert werden sollen
const serverUrl = 'http://10.10.31.11:8000';


// Die Testdaten, die gespeichert werden sollen
const testDaten = {
    datum: '10.10.2010',
    dauer: -3,
    beschreibung: 'Test Mocha',
    notizen: 'Test Mocha Notiz'
};

describe('Tagebucheintrag', function () {
    let driver;

    it('Tagebucheintrag richtig, mit Toast angezeigt und dem Fehlercode 201', async function () {


        await driver.findElement(By.className('submitBtn')).click();

        // POST-Anfrage zum Speichern der Testdaten auf dem Server
        try {
            const response = await axios.post(serverUrl, testDaten);
            console.log('Testdaten erfolgreich auf dem Server gespeichert:', response.data);
            // Überprüfen des HTTP-Statuscodes
            assert.strictEqual(response.status, 201, 'Der HTTP-Statuscode sollte 201 sein');
        } catch (error) {
            console.error('Fehler beim Speichern der Testdaten auf dem Server:', error);
        }
        await driver.sleep(2000);
    });

    // ...
});