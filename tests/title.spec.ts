import { test, expect } from '@playwright/test';

test('Has Title', async({ page }) => {
  await page.goto('https://megaman.fandom.com/');
  await page.waitForLoadState('domcontentloaded');

  const pageTitle = await page.title();
  console.log(`Title: ${pageTitle}`);
  await expect(page).toHaveTitle("MMKB | Fandom");
  await page.close();
});

test('Get Content', async({ page }) => {
  await page.goto('https://megaman.fandom.com/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForSelector('#mw-content-text > div.mw-parser-output > div.main-page-tag-lcs.main-page-tag-lcs-exploded > div > div:nth-child(2) > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > a');
  const content = await page.$eval('#mw-content-text > div.mw-parser-output > div.main-page-tag-lcs.main-page-tag-lcs-exploded > div > div:nth-child(2) > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(1) > a', (el) => el.textContent);
  console.log(`Content: ${content}`);
  await page.close();
  await expect(content).toBe('Mega Man');
});
