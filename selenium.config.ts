import { Capabilities } from 'selenium-webdriver';

export function getChromeCapabilities() {
    const capabilities = Capabilities.chrome();

    capabilities.set('goog:chromeOptions', {
        args: [
            '--disable-gpu',
            '--headless',
            '--no-sandbox',
        ]
    });
    return capabilities;
}