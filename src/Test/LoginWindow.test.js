const { Builder, By, until} = require('selenium-webdriver');
describe('Login Window Display Test', function () {
    let driver;

    // eslint-disable-next-line no-undef
    before(async function() {
        //Selenium WebDriver wird für Chrome erstellt
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('Login Windows sollte geöffnet werden, wenn der Login-Button gedrückt wird', async function () {
        //Chai importieren
        const { expect } = await import('chai');

        //Webseite auf der, der Test ausgeführt werden soll
        await driver.get('http://localhost:3000');

        //Drücken des Login Buttons
        const loginButton = await  driver.findElement(By.id('loginButton'));
        await loginButton.click();

        //Warten bis das Login sich öffnet
        await driver.wait(until.elementLocated(By.id('loginWindow')), 5000);

        //Überprüfen, ob der HTML-Code des Logins auf der Seite angezeigt wird
        const loginWindow = await driver.findElement(By.id('loginWindow'));
        const wirdAngezeigt = await loginWindow.isDisplayed();

        // eslint-disable-next-line no-unused-expressions,jest/valid-expect
        expect(wirdAngezeigt).to.be.true;
    });

    // eslint-disable-next-line no-undef
    after(async function () {
        await driver.quit();
    });

});