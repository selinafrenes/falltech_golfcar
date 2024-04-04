const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
// eslint-disable-next-line jest/valid-describe-callback
describe('Datenschutz Und Impressum Test',  function () {
    this.timeout(3000);
    // eslint-disable-next-line no-unused-vars
    let driver;

    // eslint-disable-next-line no-undef
    before(async function () {
        //Initialisieren des drivers auf den Browser
        driver = await new Builder().forBrowser('chrome').build();
    });

    const performButtonClickTest = async (btn) => {
        await driver.get('http://localhost:3000');
        const button = await driver.findElement(By.id(btn));
        await button.click();
        await driver.sleep(1000);
        return await driver.getCurrentUrl();
    };

    it('Impressum Test', async function() {
        const currentUrl = await performButtonClickTest('impressumBtn');
        assert.strictEqual(currentUrl, 'http://localhost:3000/impressum');
    });

    it('Datenschutz Test', async function() {
        const currentUrl = await performButtonClickTest('datenschutzBtn');
        assert.strictEqual(currentUrl, 'http://localhost:3000/datenschutz');
    });

    // eslint-disable-next-line no-undef
    after(async function() {
        await driver.quit();
    });


});