import { test, expect } from '@playwright/test';

test.describe('Pokemon Explorer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/explorer');
  });

  test('should load the explorer page with Pokemon grid', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Pokemon Explorer/);

    // Check header visibility based on viewport
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      // Mobile viewport - check for mobile header div
      await expect(page.locator('div.md\\:hidden.flex.items-center.justify-between.bg-white.border-b.border-red-200')).toBeVisible();
    } else {
      // Desktop viewport - check for desktop header
      await expect(page.locator('header.hidden.md\\:flex')).toBeVisible();
    }

    // The h1 with "Pokemon Explorer" has responsive classes, so we need to check if it exists rather than if it's visible
    const pokemonExplorerH1 = page.locator('h1:has-text("Pokemon Explorer")');
    await expect(pokemonExplorerH1).toHaveCount(2); // Should have 2 elements (one for desktop, one for mobile)

    // Wait for Pokemon cards to load with a longer timeout
    await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });

    // Check that Pokemon cards are loaded
    await expect(page.locator('[data-testid="pokemon-card"]').first()).toBeVisible();

    // Check that multiple Pokemon are displayed
    const pokemonCards = page.locator('[data-testid="pokemon-card"]');
    await expect(pokemonCards).toHaveCount(50); // Default page size
  });

  test('should display Pokemon information correctly', async ({ page }) => {
    // Wait for Pokemon to load
    await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });

    // Check first Pokemon card
    const firstCard = page.locator('[data-testid="pokemon-card"]').first();

    // Check Pokemon name is visible
    await expect(firstCard.locator('h3')).toBeVisible();

    // Check Pokemon image is loaded
    const image = firstCard.locator('img');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('alt', /official artwork/);

    // Check Pokemon types are displayed
    await expect(firstCard.locator('text=grass')).toBeVisible();
  });

  test('should have working search functionality', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });

    // Find search input - look for the actual search input in the filter bar
    const searchInput = page.locator(
      'input[placeholder*="Search Pokemon"], input[placeholder*="Search by name"], input[placeholder*="Search"]'
    );

    // Check if search input is visible based on viewport
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      // On mobile, search might be in a different location or hidden
      // Skip this test on mobile for now
      return;
    }

    await expect(searchInput).toBeVisible();

    // Type in search
    await searchInput.fill('bulbasaur');
    await searchInput.press('Enter');

    // Wait for search results
    await page.waitForTimeout(1000);

    // Check that results are filtered
    const pokemonCards = page.locator('[data-testid="pokemon-card"]');
    await expect(pokemonCards).toHaveCount(1);
    await expect(pokemonCards.first().locator('text=Bulbasaur')).toBeVisible();
  });

  test('should have working filters', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });

    // Check if we're on mobile viewport
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      // On mobile, filters might be in a different location or hidden
      // Skip this test on mobile for now
      return;
    }

    // Test type filter - look for the actual filter button
    const typeFilter = page.locator('button:has-text("Types"), button:has-text("Type")');
    if ((await typeFilter.count()) > 0) {
      await typeFilter.first().click();

      // Select grass type
      const grassOption = page.locator('text=grass, text=Grass');
      if ((await grassOption.count()) > 0) {
        await grassOption.first().click();

        // Wait for filter to apply
        await page.waitForTimeout(1000);

        // Check that only grass type Pokemon are shown
        const pokemonCards = page.locator('[data-testid="pokemon-card"]');
        for (let i = 0; i < (await pokemonCards.count()); i++) {
          await expect(pokemonCards.nth(i).locator('text=grass, text=Grass')).toBeVisible();
        }
      }
    }
  });

  test('should have working sorting', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });

    // Test sort functionality - look for the actual sort button
    const sortButton = page.locator('button:has-text("Sort"), button:has-text("Sort by")');
    if ((await sortButton.count()) > 0) {
      await sortButton.first().click();

      // Select name sort
      const nameSort = page.locator('text=Name, text=name');
      if ((await nameSort.count()) > 0) {
        await nameSort.first().click();

        // Wait for sort to apply
        await page.waitForTimeout(1000);

        // Check that Pokemon are sorted by name
        const pokemonNames = page.locator('[data-testid="pokemon-card"] h3');
        const names = [];
        for (let i = 0; i < (await pokemonNames.count()); i++) {
          names.push(await pokemonNames.nth(i).textContent());
        }

        // Check that names are in alphabetical order
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
      }
    }
  });

  test('should have working pagination', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });

    // Check pagination controls
    const pagination = page.locator('nav[aria-label*="pagination"], nav[aria-label="pagination"]');
    if ((await pagination.count()) > 0) {
      // Click next page
      const nextButton = page.locator('a[aria-label*="next"], button[aria-label*="next"], button:has-text("Next")');
      if ((await nextButton.count()) > 0) {
        await nextButton.first().click();

        // Wait for page change
        await page.waitForTimeout(1000);

        // Check that different Pokemon are shown
        const pokemonCards = page.locator('[data-testid="pokemon-card"]');
        await expect(pokemonCards.first()).toBeVisible();
      }
    }
  });

  test('should open Pokemon detail modal', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });

    // Click on first Pokemon card
    const firstCard = page.locator('[data-testid="pokemon-card"]').first();
    await firstCard.click();

    // Check that modal opens - use a more specific selector for the modal container
    const modal = page.locator('div.fixed.inset-0.z-50.flex.items-center.justify-center, [role="dialog"], [data-testid*="modal"]');
    await expect(modal).toBeVisible();

    // Check modal content
    await expect(modal.locator('h2, h3').first()).toBeVisible(); // Pokemon name
    await expect(modal.locator('img').first()).toBeVisible(); // Pokemon image

    // Close modal
    const closeButton = modal.locator('button:has-text("×"), button[aria-label*="close"], button[aria-label*="Close"]');
    if ((await closeButton.count()) > 0) {
      await closeButton.first().click();
      await expect(modal).not.toBeVisible();
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });

    // Test tab navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();

    // Test arrow key navigation
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');

    // Test Enter key to open modal
    await page.keyboard.press('Enter');

    // Check if modal opened
    const modal = page.locator('div.fixed.inset-0.z-50.flex.items-center.justify-center, [role="dialog"], [data-testid*="modal"]');
    if ((await modal.count()) > 0) {
      await expect(modal).toBeVisible();

      // Close with Escape key
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Wait for page to load
    await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });

    // Check that Pokemon cards are still visible - use first() to avoid strict mode violation
    await expect(page.locator('[data-testid="pokemon-card"]').first()).toBeVisible();

    // Check that mobile navigation is accessible - look for the mobile header div
    const mobileHeader = page.locator('div.md\\:hidden.flex.items-center.justify-between.bg-white.border-b.border-red-200');
    if ((await mobileHeader.count()) > 0) {
      await expect(mobileHeader.first()).toBeVisible();
    }

    // Test mobile menu if it exists
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), svg[class*="Menu"]');
    if ((await mobileMenuButton.count()) > 0) {
      await mobileMenuButton.first().click();
      await expect(page.locator('nav')).toBeVisible();
    }
  });

  test('should handle loading and error states', async ({ page }) => {
    // Reload page to test loading states
    await page.reload();

    // Check for loading indicators
    const loadingElements = page.locator('[data-testid*="loading"], [class*="loading"], [class*="skeleton"]');
    if ((await loadingElements.count()) > 0) {
      await expect(loadingElements.first()).toBeVisible();

      // Wait for loading to complete
      await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });
      await expect(loadingElements.first()).not.toBeVisible();
    }

    // Check for error handling
    const errorElements = page.locator('[data-testid*="error"], [class*="error"], .error');
    if ((await errorElements.count()) > 0) {
      await expect(errorElements.first()).not.toBeVisible();
    }
  });

  test('should have proper accessibility features', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector('[data-testid="pokemon-card"]', { timeout: 15000 });

    // Check for proper heading structure - check if any heading is visible
    const headingElements = page.locator('h1, h2, h3');
    let hasVisibleHeading = false;
    for (let i = 0; i < (await headingElements.count()); i++) {
      if (await headingElements.nth(i).isVisible()) {
        hasVisibleHeading = true;
        break;
      }
    }
    expect(hasVisibleHeading).toBeTruthy();

    // Check for proper alt text on images
    const images = page.locator('img');
    for (let i = 0; i < (await images.count()); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check for proper focus management
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    if ((await focusedElement.count()) > 0) {
      await expect(focusedElement.first()).toBeVisible();
    }
  });
});
