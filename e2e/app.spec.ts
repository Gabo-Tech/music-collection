import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['Pixel 5'],
  viewport: { width: 375, height: 667 },
});

test.describe('Music Collection App - Mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  test('should display the title', async ({ page }) => {
    await expect(page).toHaveTitle(/Canciones/);
  });

  test('should display navbar', async ({ page }) => {
    const navbar = await page.$('app-navbar');
    expect(navbar).not.toBeNull();
  });

  test('should navigate and interact with the navbar', async ({ page }) => {
    await page.waitForSelector('.navbar__toggle-button > .w-6', { timeout: 20000 });
    await page.click('.navbar__toggle-button > .w-6', { force: true });

    await page.waitForSelector('.navbar__sidebar-link:nth-child(3)', { timeout: 20000 });
    await page.click('.navbar__sidebar-link:nth-child(3)', { force: true });

    await page.waitForSelector('.navbar__toggle-button path', { timeout: 20000 });
    await page.click('.navbar__toggle-button path', { force: true });

    await page.waitForSelector('.navbar__sidebar-link:nth-child(4)', { timeout: 20000 });
    await page.click('.navbar__sidebar-link:nth-child(4)', { force: true });

    await page.waitForSelector('.navbar__toggle-button > .w-6', { timeout: 20000 });
    await page.click('.navbar__toggle-button > .w-6', { force: true });

    await page.waitForSelector('.navbar__sidebar-close-button > .w-6', { timeout: 20000 });
    await page.click('.navbar__sidebar-close-button > .w-6', { force: true });

    await page.waitForSelector('.navbar__toggle-button > .w-6', { timeout: 20000 });
    await page.click('.navbar__toggle-button > .w-6', { force: true });

    await page.waitForSelector('.navbar__sidebar-link:nth-child(2)', { timeout: 20000 });
    await page.click('.navbar__sidebar-link:nth-child(2)', { force: true });
  });
});
