import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

test.describe('Product Search', () => {
  test('should search for Laptop and show matching results', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.navigateToApplication();

    await searchPage.searchForProduct('Laptop');

    await searchPage.verifySearchResultsPage();
    await searchPage.verifyMatchingProductPresent('Laptop');

    await page.screenshot({ path: 'screenshots/product-search-laptop.png', fullPage: true });
    console.log('Product search validation passed for Laptop');
  });
});
