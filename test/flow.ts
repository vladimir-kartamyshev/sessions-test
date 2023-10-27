
import { Builder, until } from 'selenium-webdriver';
import { getChromeCapabilities } from '../selenium.config';
import commandLineArgs, { OptionDefinition } from 'command-line-args';

const url = process.env.URL || 'http://user@dev-test/staging/app-debug/';
const title = process.env.TITLE || 'Начало · Loginom';
const countSessions = Number(process.env.COUNT_SESSIONS) || 50;

const durationCheckSessionsInSeconds = 60;

async function CheckTabs(driver, duration: number, totalRuntimeSeconds: number) {
  const tabs = await driver.getAllWindowHandles();
  const startTime = new Date().getTime();
  let iterationCount = 0;
  while ((new Date().getTime() - startTime) / 1000 < totalRuntimeSeconds) {
    for (let i = 0; i < tabs.length; i++) {
      await driver.switchTo().window(tabs[i]);
      await driver.wait(until.titleIs(title), duration);
      iterationCount++;
      if (iterationCount % 20 === 0) {
      console.log(`Сессии живы, продолжаю наблюдение`);
      console.log(url);
      }
      if ((new Date().getTime() - startTime) / 1000 >= totalRuntimeSeconds) {
        break;
      }
    }
  }
}

it('', async () => {
  const driver = new Builder().withCapabilities(getChromeCapabilities()).build();
  await driver.get(url);
  for (let i = 0; i < countSessions; i++) {
          driver.executeScript(`window.open("${url}")`);
          await driver.wait(until.titleIs(title), 180000);
          console.log(`Поток 0, сессия ${i} открыта`);
        }
        await CheckTabs(driver, 10000, durationCheckSessionsInSeconds);
});
