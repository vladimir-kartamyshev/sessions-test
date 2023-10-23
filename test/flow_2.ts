import { Builder, until } from 'selenium-webdriver';
import { getChromeCapabilities } from '../selenium.config';

const url = 'http://user@dev-test/staging/app-debug/';

const countSessions = 200;
const durationCheckSessionsInSeconds = 100000;


async function CheckTabs(driver, duration: number, totalRuntimeSeconds: number) {
  const tabs = await driver.getAllWindowHandles();
  const startTime = new Date().getTime(); // Время начала выполнения функции в миллисекундах
  let iterationCount = 0;
  while ((new Date().getTime() - startTime) / 1000 < totalRuntimeSeconds) {
    for (let i = 1; i < tabs.length; i++) {
      await driver.switchTo().window(tabs[i]);
      const title = 'Начало · Loginom';
      await driver.wait(until.titleIs(title), duration);
      iterationCount++;
      if (iterationCount % 20 === 0) {
      console.log(`Сессии потока 2 живы, продолжаю наблюдение`);
      }

      if ((new Date().getTime() - startTime) / 1000 >= totalRuntimeSeconds) {
        break; // Прерывание цикла, если общее время выполнения функции истекло
      }
    }
  }
}


describe("Нагрузочное", () => {
  const driver = new Builder().withCapabilities(getChromeCapabilities()).build();


      it('Нагрузочное', async () => {
        for (let i = 0; i < countSessions; i++) {
          driver.executeScript('window.open("http://user@dev-test/staging/app-debug/");');
          await driver.get(url);
          console.log(`Поток 1, сессия ${i} открыта`);

        }
        await CheckTabs(driver, 10000, durationCheckSessionsInSeconds);
      });
});
