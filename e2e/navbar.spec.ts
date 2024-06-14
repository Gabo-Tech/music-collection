import { test, expect } from '@playwright/test';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the title in the navbar', async ({ page }) => {
    await expect(page.locator('.navbar__title')).toHaveText('Mock Title');
  });

  test('should toggle menu visibility', async ({ page }) => {
    const menuButton = page.locator('.menu-toggle');
    await menuButton.click();
    await expect(page.locator('.navbar__menu')).toBeVisible();
    await menuButton.click();
    await expect(page.locator('.navbar__menu')).not.toBeVisible();
  });

  test('should close the menu when a sidebar link is clicked', async ({ page }) => {
    const menuButton = page.locator('.menu-toggle');
    await menuButton.click();
    const sidebarLink = page.locator('.navbar__sidebar-link').first();
    await sidebarLink.click();
    await expect(page.locator('.navbar__menu')).not.toBeVisible();
  });
});
