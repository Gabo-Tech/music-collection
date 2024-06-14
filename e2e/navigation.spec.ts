import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to songs page', async ({ page }) => {
    await page.click('text=SONGS');
    await expect(page).toHaveURL('/songs');
    await expect(page.locator('h1')).toHaveText('Songs List');
  });

  test('should navigate to artists page', async ({ page }) => {
    await page.click('text=ARTISTS');
    await expect(page).toHaveURL('/artists');
    await expect(page.locator('h1')).toHaveText('Artists List');
  });

  test('should navigate to companies page', async ({ page }) => {
    await page.click('text=COMPANIES');
    await expect(page).toHaveURL('/companies');
    await expect(page.locator('h1')).toHaveText('Companies List');
  });
});
