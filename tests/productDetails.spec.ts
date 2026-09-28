import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

test.describe('Product Details', () => {
  test('should verify product details after opening first product from search', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    // Navigate to application
    await searchPage.navigateToApplication();

    // Search for a product
    const searchKeyword = 'Laptop';
    await searchPage.searchForProduct(searchKeyword);

    // Verify search results page
    await searchPage.verifySearchResultsPage();

    // Open first product from search results
    const firstProduct = page.locator('.product-item .product-title a').first();
    await firstProduct.click();

    // Verify product name is displayed
    await productDetailsPage.verifyProductNameDisplayed();
    const productName = await productDetailsPage.getProductName();
    console.log(`Product Name: ${productName}`);

    // Verify product name matches search keyword
    await productDetailsPage.verifyProductNameMatches(searchKeyword);

    // Verify price is displayed
    await productDetailsPage.verifyPriceIsDisplayed();
    const productPrice = await productDetailsPage.getProductPrice();
    console.log(`Product Price: ${productPrice}`);

    // Verify Add To Cart button exists
    await productDetailsPage.verifyAddToCartButtonExists();

    // Take screenshot
    await page.screenshot({ path: 'screenshots/product-details.png', fullPage: true });
    console.log('Product details validation passed');
  });

  test('should add product to cart from details page', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    // Navigate to application
    await searchPage.navigateToApplication();

    // Search for a product
    await searchPage.searchForProduct('Smartphone');

    // Verify search results page
    await searchPage.verifySearchResultsPage();

    // Open first product from search results
    const firstProduct = page.locator('.product-item .product-title a').first();
    await firstProduct.click();

    // Verify all product details
    await productDetailsPage.verifyProductNameDisplayed();
    await productDetailsPage.verifyPriceIsDisplayed();
    await productDetailsPage.verifyAddToCartButtonExists();

    // Click Add To Cart button
    await productDetailsPage.clickAddToCart();

    // Verify success message
    await expect(page.locator('text=The product has been added to your shopping cart')).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'screenshots/product-details-add-to-cart.png', fullPage: true });
    console.log('Add to cart validation passed');
  });
});
