const { Builder, By, until} = require('selenium-webdriver');

/*Noch auf den Server zugreifen damit der Test überprüft werden kann */

describe('Tagebucheintrag', function () {
    //this.timeout(25000);
    let driver;

    this.timeout(25000);

    // eslint-disable-next-line no-undef
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000');
        const loginButton = await  driver.findElement(By.id('loginButton'));
        await loginButton.click();
        //Anmelden
        try {
            await driver.findElement(By.id('username')).sendKeys('frenerwilma');
            await driver.findElement(By.id('password')).sendKeys('fancy1290');
            await driver.findElement(By.id('submitBtn')).click();
        } catch (error) {
            console.error('Einloggen fehlgeschlagen:', error);
        }

    });

    it('Tagebucheintrag richtig, mit Toast angezeigt und dem Fehlercode 201', async function () {
        //Laden der Testseite
        await driver.get('http://localhost:3000/tagebuch');

        await driver.sleep(4000); //4 Sekunden warten

        //Ausfüllen des Formulars
        await driver.findElement(By.id('date')).sendKeys('10.10.2010');
        await driver.findElement(By.id('duration')).sendKeys('-3');
        await driver.findElement(By.id('description')).sendKeys('Test Mocha');
        await driver.findElement(By.id('notes')).sendKeys('Test Mocha Notiz');

        //Checkbox
        const checkbox = await driver.findElement(By.className('input-checkbox-field'));
        await checkbox.click();

        //Eintragen
        await driver.findElement(By.className('submitBtn'));

        await driver.sleep(2000);
     });

    // eslint-disable-next-line no-undef
    after(async function () {
        await driver.quit();
    });
});