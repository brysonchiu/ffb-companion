import type { Page } from 'playwright';
import type { positions } from './scraper.ts';

export async function scraperAuthentication(page: Page, position: (typeof positions)[number]) {
  // Fill out the credentials
  console.log(`Filling out authentication for ${position.toUpperCase()}`);
  await page.locator('.report-page-fence a[href*="accounts/signin"]').click({ timeout: 30000 });
  await page.locator('#username').fill(`${process.env.FANTASY_PROS_USER}`);
  await page.locator('#password').fill(`${process.env.FANTASY_PROS_PASS}`);

  // Submit the form and wait for navigation to complete
  console.log(`Submitting form for ${position.toUpperCase()}`);
  await page.locator('button[type="submit"]').click();

  // Verify successful login by checking for a post-auth URL
  console.log(`Verifying authenticated state for ${position.toUpperCase()}`);
  try {
    await Promise.race([
      page.waitForURL(/.*\/get-started.*|.*?signedin/, { waitUntil: 'domcontentloaded', timeout: 30000 }),
      page.getByText('complete the captcha').waitFor({ state: 'visible' }),
    ]);

    if (page.url().includes('/get-started')) {
      console.log(`Viewing interstitial for ${position.toUpperCase()}`);
      await page.locator('a[aria-label="dismiss page"]').click();
      await page.waitForURL(/.*?signedin/, { waitUntil: 'domcontentloaded', timeout: 30000 });
      console.log(`Logged in successfully for ${position.toUpperCase()}`);
    } else if (page.url().includes('?signedin')) {
      console.log(`Logged in successfully for ${position.toUpperCase()}`);
    } else if (page.getByText('complete the captcha')) {
      console.log(`Ran into a Captcha for ${position.toUpperCase()}`);
      return false;
    } else {
      throw new Error(`Did not load expected page at login. Instead loaded ${page.url()}`);
    }
    return true;
  } catch (error) {
    throw error;
  }
}
