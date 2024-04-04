const { Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');
describe('Login und Logout Test', function () {
    let driver;

    // eslint-disable-next-line no-undef
    before(async function() {
        //Selenium WebDriver wird für Chrome erstellt
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000');
        const loginButton = await  driver.findElement(By.id('loginButton'));
        await loginButton.click();

        //Anmelden
        await driver.findElement(By.id('username')).sendKeys('frenerwilma');
        await driver.findElement(By.id('password')).sendKeys('fancy1290');
        await driver.findElement(By.id('submitBtn')).click();
        await driver.sleep(1000);
    });

    it('Logout', async function () {
        await driver.get('http://localhost:3000/tagebuch');
        const logoutBtn = await driver.findElement(By.id('logoutBtn'));
        logoutBtn.click();
        const currentLocation = driver.getCurrentUrl();
        assert.strictEqual(currentLocation, 'http://localhost:3000');

    });

    // eslint-disable-next-line no-undef
    after(async function () {
        await driver.quit();
    });

});