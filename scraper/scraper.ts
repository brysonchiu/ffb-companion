import { chromium } from 'playwright-extra';
import type { Browser, BrowserContext } from 'playwright';
import { jsonOutput } from './jsonOutput.ts';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { getPlayerData } from './getPlayerData.ts';

export const positions = ['qb', 'rb', 'wr', 'te', 'k', 'dst'] as const;

async function runScraper() {
  // Launch a headed browser so you can visually see the login if needed
  // Change headless to true when running in production
  chromium.use(StealthPlugin());
  const browser: Browser = await chromium.launch({
    headless: true,
    // slowMo: 1000,
  });
  const context: BrowserContext = await browser.newContext({});

  try {
    //Used to test the setup
    // await page.goto('https://bot.sannysoft.com/');
    // await page.screenshot({
    //   path: 'scraper/results.png',
    //   fullPage: true,
    // });

    // 2. Navigate to the target login page
    // console.log('Navigating to login page...');
    // const page: Page = await context.newPage();
    // await page.goto('https://www.fantasypros.com/accounts/signin/', { waitUntil: 'domcontentloaded' });

    // // 3. Fill out the credentials
    // console.log('Filling out credentials...');
    // await page.locator('#username').fill(`${process.env.FANTASY_PROS_USER}`);
    // await page.locator('#password').fill(`${process.env.FANTASY_PROS_PASS}`);

    // // 4. Submit the form and wait for navigation to complete
    // console.log('Submitting form...');
    // await page.locator('button[type="submit"]').click();

    // // 5. Verify successful login by checking for a post-auth URL
    // console.log('Verifying authenticated state...');
    // await page.waitForURL(/.*\/get-started.*|.*?signedin/, { waitUntil: 'domcontentloaded' });
    // if (page.url().includes('/get-started')) {
    //   console.log('Viewing interstitial...');
    //   await page.locator('a[aria-label="dismiss page"]').click();
    //   await page.waitForURL(/.*?signedin/, { waitUntil: 'domcontentloaded' });
    // } else if (page.url().includes('?signedin')) {
    //   console.log('Viewing dashboard...');
    // } else {
    //   throw new Error(`Did not load expected page at login.  Insteead loaded ${page.url()}`);
    // }
    // console.log('Logged in successfully');

    // Scrape data
    console.log('Scraping data...');
    const data = [];
    for (const position of positions) {
      const poisitionData = await getPlayerData(position, context);
      data.push(poisitionData);
    }

    // Save data
    if (data.every((item) => item !== undefined)) {
      //Join array of positional objects into one object
      jsonOutput(Object.assign({}, ...data));
    }
  } catch (error) {
    console.error('\x1b[0m', 'An error occurred during scraping:', '\x1b[0m', error);
  } finally {
    // Ensure browser closes cleanly
    await browser.close();
  }
}

runScraper();
