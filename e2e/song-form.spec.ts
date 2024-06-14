import { test, expect } from '@playwright/test';

test.describe('Song Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/songs/new');
  });

  test('should display Add New Song form', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Add New Song');
  });

  test('should add a new song', async ({ page }) => {
    await page.fill('input[name="title"]', 'New Song');
    await page.fill('input[name="genre"]', 'Pop');
    await page.fill('input[name="year"]', '2022');
    await page.fill('input[name="duration"]', '180');
    await page.fill('input[name="rating"]', '4.0');
    await page.fill('input[name="artist"]', 'New Artist');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/songs');
    await expect(page.locator('li:has-text("New Song")')).toBeVisible();
  });

  test('should display validation messages', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('.error-message')).toHaveCount(5);
  });
});
