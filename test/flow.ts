import { Builder, until } from 'selenium-webdriver';
import { getChromeCapabilities } from '../selenium.config';

const url = 'https://www.google.com/';

const countSessions = 5;
const durationCheckSessionsInSeconds = 60;


async function CheckTabs(driver, duration: number, totalRuntimeSeconds: number) {
  const tabs = await driver.getAllWindowHandles();
  const startTime = new Date().getTime(); // Время начала выполнения функции в миллисекундах
  let iterationCount = 0;
  while ((new Date().getTime() - startTime) / 1000 < totalRuntimeSeconds) {
    for (let i = 0; i < tabs.length; i++) {
      await driver.switchTo().window(tabs[i]);
      const title = 'Google';
      await driver.wait(until.titleIs(title), duration);
      iterationCount++;
      if (iterationCount % 20 === 0) {
      console.log(`Сессии живы, продолжаю наблюдение`);
      }
      if ((new Date().getTime() - startTime) / 1000 >= totalRuntimeSeconds) {
        break; // Прерывание цикла, если общее время выполнения функции истекло
      }
    }
  }
}


it('', async () => {
  const driver = new Builder().withCapabilities(getChromeCapabilities()).build();
  await driver.get(url);
  for (let i = 0; i < countSessions; i++) {
          driver.executeScript(`window.open("${url}")`);
          const title = 'Google';
          await driver.wait(until.titleIs(title), 180000);
          console.log(`Поток 0, сессия ${i} открыта`);
        }
        await CheckTabs(driver, 10000, durationCheckSessionsInSeconds);
});
