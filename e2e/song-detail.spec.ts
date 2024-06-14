import { test, expect } from '@playwright/test';

test.describe('Song Detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/songs/1');
  });

  test('should display song details', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Test Song');
    await expect(page.locator('img')).toHaveAttribute('src', 'test-poster-url');
    await expect(page.locator('p')).toHaveText('Pop, Rock');
  });

  test('should display loading message', async ({ page }) => {
    await page.route('**/songs/1', route => {
      setTimeout(() => route.fulfill({
        body: JSON.stringify({
          poster: 'test-poster-url',
          title: 'Test Song',
          genre: ['Pop', 'Rock'],
          year: 2021,
          duration: 210,
          rating: 4.5,
          artist: 'Test Artist',
        }),
        contentType: 'application/json',
      }), 2000);
    });

    await page.reload();
    await expect(page.locator('.text-center')).toHaveText('Loading...');
  });
});
