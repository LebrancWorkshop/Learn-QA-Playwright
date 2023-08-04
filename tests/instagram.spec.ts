import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const { INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD } = process.env;

test('Login to Instagram', async({ page }) => {
  await page.goto('https://www.instagram.com/');
  // await page.waitForLoadState('domcontentloaded');
  // await page.waitForTimeout(10000);

  if(typeof INSTAGRAM_USERNAME === 'string' && typeof INSTAGRAM_PASSWORD === 'string') {
    await page.locator('input[aria-label="Phone number, username, or email"]').fill(INSTAGRAM_USERNAME);
    await page.locator('input[aria-label="Password"]').fill(INSTAGRAM_PASSWORD);
  } else {
    throw new Error('Please set INSTAGRAM_USERNAME and INSTAGRAM_PASSWORD in your .env file');
  }

  await page.locator('button[type="submit"]').click();
  // await page.waitForTimeout(10000);

  // const profileLocator = page.getByText('Profile');
  // await page.waitForTimeout(5000);
  const errorLocator = page.getByText('Sorry, your password was incorrect. Please double-check your password.');
  await expect(errorLocator).toBeHidden();
  await page.close();
});

test('Login to Instagram with wrong password', async({ page }) => {
  await page.goto('https://www.instagram.com/');
  // await page.waitForLoadState('domcontentloaded');
  // await page.waitForTimeout(10000);

  if (typeof INSTAGRAM_USERNAME === 'string' && typeof INSTAGRAM_PASSWORD === 'string') {
    await page.locator('input[aria-label="Phone number, username, or email"]').fill(INSTAGRAM_USERNAME);
    await page.locator('input[aria-label="Password"]').fill('jnvsdjvndvsdnvsdfks');
  } else {
    throw new Error('Please set INSTAGRAM_USERNAME and INSTAGRAM_PASSWORD in your .env file');
  }

  await page.locator('button[type="submit"]').click();
  // await page.waitForTimeout(5000);

  const errorLocator = page.getByText('Sorry, your password was incorrect. Please double-check your password.');
  await expect(errorLocator).toBeVisible();
  await page.close();
});

test('Login to Instagram with wrong username', async({ page }) => {
  await page.goto('https://www.instagram.com/');
  // await page.waitForLoadState('domcontentloaded');
  // await page.waitForTimeout(10000);

  if (typeof INSTAGRAM_USERNAME === 'string' && typeof INSTAGRAM_PASSWORD === 'string') {
    await page.locator('input[aria-label="Phone number, username, or email"]').fill('8fwe9f08ds89sd98haioj');
    await page.locator('input[aria-label="Password"]').fill(INSTAGRAM_PASSWORD);
  } else {
    throw new Error('Please set INSTAGRAM_USERNAME and INSTAGRAM_PASSWORD in your .env file');
  }

  await page.locator('button[type="submit"]').click();
  // await page.waitForTimeout(5000);

  const errorLocator = page.getByText('Sorry, your password was incorrect. Please double-check your password.');
  await expect(errorLocator).toBeVisible();
  await page.close();
});
