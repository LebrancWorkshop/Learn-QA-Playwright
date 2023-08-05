import { test, expect } from '@playwright/test';

const baseURL = 'https://www.youtube.com/';

test('Test Channel freecodecamp is Exist', async({ page }) => {
  const channelID = 'freecodecamp';
  const url = `${baseURL}@${channelID}`;

  await page.goto(url);
  await page.waitForTimeout(1000);

  await expect(page).toHaveTitle(`freeCodeCamp.org - YouTube`);

  await page.close();
});

test('Test Channel adisjdpaisjdaopdajosdiasj is not Exist', async({ page }) => {
  const channelID = 'adisjdpaisjdaopdajosdiasj';
  const url = `${baseURL}@${channelID}`;

  await page.goto(url);
  await page.waitForTimeout(1000);

  await expect(page).toHaveTitle('404 Not Found');
  await page.close();
});
