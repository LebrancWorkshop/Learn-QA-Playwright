import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const { LINKEDIN_USERNAME, LINKEDIN_PASSWORD } = process.env;

test('Login to Linkedin', async({ page }) => {
  await page.goto('https://www.linkedin.com/');
  await page.waitForLoadState('domcontentloaded');

  if(typeof LINKEDIN_USERNAME === 'string' && typeof LINKEDIN_PASSWORD === 'string') {
    await page.locator('input[name="session_key"]').fill(LINKEDIN_USERNAME);
    await page.locator('input[name="session_password"]').fill(LINKEDIN_PASSWORD);
  }

  await page.locator('button[type="submit"]').click();

  const verifyLocator = await page.getByText('Let\'s do a quick verification');
  await expect(verifyLocator).toBeVisible();
  await page.close();
});
