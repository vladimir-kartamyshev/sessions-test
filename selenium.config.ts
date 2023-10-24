import { Capabilities } from 'selenium-webdriver';

export function getChromeCapabilities() {
    const capabilities = Capabilities.chrome();

    capabilities.set('goog:chromeOptions', {
        args: [
            // '--lang=ru',
            '--disable-gpu',
            '--headless=new',
            ' --no-sandbox'
        ]
    });
    return capabilities;
}