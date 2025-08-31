import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the homepage with all sections', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/Pokemon Explorer/);

    // Homepage should NOT have a header
    await expect(page.locator('header')).not.toBeVisible();

    // Check for the main hero content - use specific selectors to avoid strict mode violations
    await expect(page.locator('h1:has-text("Pokemon Explorer")')).toBeVisible();
    await expect(page.locator('text=Discover the ultimate Pokemon database')).toBeVisible();

    // Check for the "Start Exploring" button
    await expect(page.locator('text=Start Exploring')).toBeVisible();

    // Check for footer content
    await expect(page.locator('text=© 2025 Pokemon Explorer')).toBeVisible();
  });

  test('should have working call to action button', async ({ page }) => {
    // Find and click the "Start Exploring" button
    const ctaButton = page.locator('text=Start Exploring');
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();
    await expect(page).toHaveURL(/\/explorer/);

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Verify we're on the explorer page with appropriate header based on viewport
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      // Mobile viewport - check for mobile header div with specific classes
      await expect(page.locator('div.md\\:hidden.flex.items-center.justify-between.bg-white.border-b.border-red-200')).toBeVisible();
    } else {
      // Desktop viewport - check for desktop header
      await expect(page.locator('header.hidden.md\\:flex')).toBeVisible();
    }
  });

  test('should display hero section with call to action', async ({ page }) => {
    // Check hero section content - use specific selectors
    await expect(page.locator('h1:has-text("Pokemon Explorer")')).toBeVisible();
    await expect(page.locator('text=Discover the ultimate Pokemon database')).toBeVisible();

    // Check call to action button
    const ctaButton = page.locator('text=Start Exploring');
    await expect(ctaButton).toBeVisible();
    // The button should be clickable and navigate to /explorer when clicked
    await ctaButton.click();
    await expect(page).toHaveURL(/\/explorer/);

    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1:has-text("Pokemon Explorer")')).toBeVisible();

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1:has-text("Pokemon Explorer")')).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1:has-text("Pokemon Explorer")')).toBeVisible();
  });

  test('should have proper accessibility features', async ({ page }) => {
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();

    // Check for proper alt text on images
    const images = page.locator('img');
    for (let i = 0; i < (await images.count()); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check for proper focus management - don't check specific focus element
    // as it may vary based on responsive design
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    if ((await focusedElement.count()) > 0) {
      await expect(focusedElement.first()).toBeVisible();
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    if ((await focusedElement.count()) > 0) {
      await expect(focusedElement.first()).toBeVisible();
    }

    // Test Enter key on CTA button
    const ctaButton = page.locator('text=Start Exploring');
    await ctaButton.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/explorer/);

    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should have proper meta tags and SEO', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Pokemon Explorer/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    if ((await metaDescription.count()) > 0) {
      await expect(metaDescription).toHaveAttribute('content');
    }
  });

  test('should handle different viewport sizes correctly', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1:has-text("Pokemon Explorer")')).toBeVisible();
    await expect(page.locator('text=Start Exploring')).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1:has-text("Pokemon Explorer")')).toBeVisible();
    await expect(page.locator('text=Start Exploring')).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1:has-text("Pokemon Explorer")')).toBeVisible();
    await expect(page.locator('text=Start Exploring')).toBeVisible();
  });

  test('should have proper semantic HTML structure', async ({ page }) => {
    // Check for main heading
    await expect(page.locator('h1')).toBeVisible();

    // Check for call to action button
    const ctaButton = page.locator('text=Start Exploring');
    await expect(ctaButton).toBeVisible();

    // Check that button is properly accessible - don't check specific tabIndex
    // as it may not be explicitly set but still be focusable
    await ctaButton.focus();
    await expect(ctaButton).toBeFocused();
  });

  test('should handle page load performance', async ({ page }) => {
    // Measure page load time
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load within reasonable time (5 seconds)
    expect(loadTime).toBeLessThan(5000);

    // Check that all main elements are visible
    await expect(page.locator('h1:has-text("Pokemon Explorer")')).toBeVisible();
    await expect(page.locator('text=Start Exploring')).toBeVisible();
  });
});
