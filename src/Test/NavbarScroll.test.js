const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

describe('Zum Projekt, Über uns, Sponsor Test',  function () {
    this.timeout(5000);
    // eslint-disable-next-line no-unused-vars
    let driver;

    // eslint-disable-next-line no-undef
    before(async function () {
        //Initialisieren des drivers auf den Browser
        driver = await new Builder().forBrowser('chrome').build();
    });


    const performButtonClickTest = async (url, btn) => {
        await driver.get(url);
        const button = await driver.findElement(By.id(btn));
        await button.click();
        await driver.sleep(1000);
        //return await driver.getCurrentUrl();
    };


    it('Zum Projekt Test - Index HTML', async function() {
        await performButtonClickTest('http://localhost:3000', 'zumProjektBtn');
        //const location = '/index';
        const scrolledElement = await driver.findElement(By.id('zumProjekt'));
        const isScrolledIntoView = await scrolledElement.isDisplayed();
        assert.strictEqual(isScrolledIntoView, true);
    });

    it('Zum Projekt Test - Datenschutz HTML', async function() {
        await performButtonClickTest('http://localhost:3000/datenschutz', 'zumProjektBtn');
        //const location = '/index';
        const scrolledElement = await driver.findElement(By.id('zumProjekt'));
        const isScrolledIntoView = await scrolledElement.isDisplayed();
        assert.strictEqual(isScrolledIntoView, true);
    });

    it('Über Uns Test - Index HTML', async function() {
        await performButtonClickTest('http://localhost:3000', 'uberUnsBtn');
        //const location = '/index';
        const scrolledElement = await driver.findElement(By.id('aboutUs'));
        const isScrolledIntoView = await scrolledElement.isDisplayed();
        assert.strictEqual(isScrolledIntoView, true);
    });

    it('Über Uns Test - Datenschutz HTML', async function() {
        await performButtonClickTest('http://localhost:3000/datenschutz', 'uberUnsBtn');
        //const location = '/index';
        const scrolledElement = await driver.findElement(By.id('aboutUs'));
        const isScrolledIntoView = await scrolledElement.isDisplayed();
        assert.strictEqual(isScrolledIntoView, true);
    });

    it('Sponsor Test - Index HTML', async function() {
        await performButtonClickTest('http://localhost:3000', 'sponsorBtn');
        //const location = '/index';
        const scrolledElement = await driver.findElement(By.id('sponsor'));
        const isScrolledIntoView = await scrolledElement.isDisplayed();
        assert.strictEqual(isScrolledIntoView, true);
    });

    it('Sponsor Test - Impressum HTML', async function() {
        await performButtonClickTest('http://localhost:3000/impressum', 'sponsorBtn');
        //const location = '/index';
        const scrolledElement = await driver.findElement(By.id('sponsor'));
        const isScrolledIntoView = await scrolledElement.isDisplayed();
        assert.strictEqual(isScrolledIntoView, true);
    });





    // eslint-disable-next-line no-undef
    after(async function() {
        await driver.quit();
    });


});