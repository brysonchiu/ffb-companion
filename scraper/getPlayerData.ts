import { parseTableHeaders } from './parseTableHeaders.ts';
import type { positions } from './scraper.ts';
import { scraperAuthentication } from './scraperAuthentication.ts';
import { sortPlayerData } from './sortPlayerData.ts';
import type { BrowserContext, Page } from 'playwright';

const url = 'https://www.fantasypros.com/nfl/projections/';
const urlSuffix = '.php?week=draft';
const maxAttempts = 5;

export async function getPlayerData(position: (typeof positions)[number], context: BrowserContext) {
  let dataExtractAttempt = 0;
  //If the position's page is gated and login was blocked by captcha, then the data will not extract properly.
  //If the data is not fully extracted, try again.
  while (dataExtractAttempt < maxAttempts) {
    console.log(`Attempt #${dataExtractAttempt + 1} to extract ${position.toUpperCase()}...`);
    const page: Page = await context.newPage();
    try {
      await page.goto(`${url}${position}${urlSuffix}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      //Close modal if necessary
      if (await page.locator('.mcu-modal__body').first().isVisible()) {
        console.log(`Closing Modal for ${position.toUpperCase()}`);
        await page.keyboard.press('Escape');
      }
      //Login if necessary
      if (await page.locator('.sign-up-form').first().isVisible()) {
        const authSuccessful = await scraperAuthentication(page, position);
        if (!authSuccessful) {
          dataExtractAttempt++;
          if (dataExtractAttempt === maxAttempts) {
            throw new Error(`Made ${dataExtractAttempt} attempts, but could not scrape data for ${position.toUpperCase()}s.`);
          }
          continue;
        }
      }
      //Extract header and player data rows
      const tableBodyRows = await page.locator('#data > tbody > tr').all();
      const tableHeaderRows = await page.locator('#data > thead > tr').all();
      const tableHeaders = await parseTableHeaders(tableHeaderRows, position);
      const playerData = await sortPlayerData(tableBodyRows, tableHeaders, position);
      if (!tableHeaders || !playerData) {
        dataExtractAttempt++;
        if (dataExtractAttempt === maxAttempts) {
          throw new Error(`Made ${dataExtractAttempt} attempts, but could not scrape data for ${position.toUpperCase()}s.`);
        }
        continue;
      } else {
        console.log(`Scraped data for ${position.toUpperCase()}`);
        return playerData;
      }
    } catch (error) {
      throw error;
    } finally {
      await page.close();
    }
  }
}
