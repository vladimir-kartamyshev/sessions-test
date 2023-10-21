import { Builder, By, until, Key, ThenableWebDriver } from 'selenium-webdriver';
import 'chromedriver'
import { Options } from "selenium-webdriver/chrome";

const url = 'http://user@dev-test/staging/app-debug/';

const countSessions = 100;
const durationCheckSessionsInSeconds = 360;


async function CheckTabs(driver: ThenableWebDriver, duration: number, totalRuntimeSeconds: number) {
  const tabs = await driver.getAllWindowHandles();
  const startTime = new Date().getTime(); // Время начала выполнения функции в миллисекундах

  while ((new Date().getTime() - startTime) / 1000 < totalRuntimeSeconds) {
    for (let i = 1; i < tabs.length; i++) {
      await driver.switchTo().window(tabs[i]);
      const title = 'Начало · Loginom';
      await driver.wait(until.titleIs(title), duration);

      if ((new Date().getTime() - startTime) / 1000 >= totalRuntimeSeconds) {
        break; // Прерывание цикла, если общее время выполнения функции истекло
      }
    }
  }
}


describe("Нагрузочное", () => {
  const options = new Options();
  options.addArguments("--headless");
  const driver: ThenableWebDriver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();


      it('Нагрузочное', async () => {
        for (let i = 0; i < countSessions; i++) {
          driver.executeScript('window.open("http://user@dev-test/staging/app-debug/");');
          await driver.get(url);
          console.log(`Сессия ${i} открыта`);
        }
        await CheckTabs(driver, 10000, durationCheckSessionsInSeconds);
      });
});
