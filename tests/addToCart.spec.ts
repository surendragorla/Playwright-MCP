import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';

test.describe('Add Product to Cart', () => {
  test('should add product to cart and verify in shopping cart', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    
    // Step 1: Open Home page
    console.log('Step 1: Opening home page...');
    await searchPage.navigateToApplication();
    await page.waitForLoadState('networkidle');
    
    // Step 2: Open product details page
    console.log('Step 2: Searching for product and opening details...');
    const searchKeyword = 'Laptop';
    await searchPage.searchForProduct(searchKeyword);
    await searchPage.verifySearchResultsPage();
    
    // Get the first product's name
    const firstProduct = page.locator('.product-item .product-title a').first();
    const productNameText = await firstProduct.textContent() || '';
    console.log(`Selected product: ${productNameText.trim()}`);
    
    // Click to open product details
    await firstProduct.click();
    await page.waitForLoadState('networkidle');
    
    // Verify product details page loaded
    await productDetailsPage.verifyProductNameDisplayed();
    await productDetailsPage.verifyPriceIsDisplayed();
    const selectedProductName = await productDetailsPage.getProductName();
    const selectedProductPrice = await productDetailsPage.getProductPrice();
    console.log(`Product Name: ${selectedProductName.trim()}`);
    console.log(`Product Price: ${selectedProductPrice.trim()}`);
    
    // Step 3: Click Add To Cart
    console.log('Step 3: Clicking Add To Cart button...');
    await productDetailsPage.verifyAddToCartButtonExists();
    await productDetailsPage.clickAddToCart();
    await page.waitForTimeout(1000);
    
    // Step 4: Verify success notification
    console.log('Step 4: Verifying success notification...');
    const successNotification = page.locator('text=The product has been added to your shopping cart');
    await expect(successNotification).toBeVisible({ timeout: 5000 });
    console.log('✓ Success notification verified');
    
    // Take screenshot after adding to cart
    await page.screenshot({ path: 'screenshots/product-added-to-cart.png', fullPage: true });
    
    // Step 5: Navigate to Shopping Cart
    console.log('Step 5: Navigating to shopping cart...');
    await shoppingCartPage.navigateToCart();
    await page.waitForLoadState('networkidle');
    
    // Step 6: Verify selected product exists in cart
    console.log('Step 6: Verifying product exists in cart...');
    await shoppingCartPage.verifyCartPageLoaded();
    await shoppingCartPage.verifyCartIsNotEmpty();
    
    // Verify the specific product we added is in the cart
    await shoppingCartPage.verifyProductExistsInCart(searchKeyword);
    await shoppingCartPage.verifyCartTotalVisible();
    
    const cartTotal = await shoppingCartPage.getCartTotalPrice();
    console.log(`Cart Total: ${cartTotal}`);
    console.log('✓ Product verified in shopping cart');
    
    // Take final screenshot
    await page.screenshot({ path: 'screenshots/shopping-cart-with-product.png', fullPage: true });
    
    console.log('✓ Add Product to Cart scenario completed successfully');
  });

  test('should add multiple products to cart and verify all in shopping cart', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    
    // Navigate to home
    await searchPage.navigateToApplication();
    await page.waitForLoadState('networkidle');
    
    const productsToAdd = ['Laptop', 'Mouse'];
    const addedProducts: string[] = [];
    
    // Add multiple products to cart
    for (const productKeyword of productsToAdd) {
      console.log(`Adding product: ${productKeyword}`);
      
      // Search for product
      await searchPage.searchForProduct(productKeyword);
      await searchPage.verifySearchResultsPage();
      
      // Click first product
      const firstProduct = page.locator('.product-item .product-title a').first();
      const productText = await firstProduct.textContent() || '';
      addedProducts.push(productText.trim());
      
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      
      // Verify and add to cart
      await productDetailsPage.verifyAddToCartButtonExists();
      await productDetailsPage.clickAddToCart();
      
      // Wait for success message
      const successNotification = page.locator('text=The product has been added to your shopping cart');
      await expect(successNotification).toBeVisible({ timeout: 5000 });
      console.log(`✓ ${productKeyword} added to cart`);
      
      // Go back to home for next search
      await searchPage.navigateToApplication();
      await page.waitForLoadState('networkidle');
    }
    
    // Navigate to cart
    await shoppingCartPage.navigateToCart();
    await page.waitForLoadState('networkidle');
    
    // Verify cart page
    await shoppingCartPage.verifyCartPageLoaded();
    await shoppingCartPage.verifyCartIsNotEmpty();
    
    // Verify all products exist in cart
    for (const productName of addedProducts) {
      console.log(`Verifying: ${productName}`);
      const productInCart = page.locator(`table.cart tbody tr:has-text("${productName}")`);
      await expect(productInCart).toBeVisible();
    }
    
    const cartTotal = await shoppingCartPage.getCartTotalPrice();
    console.log(`Cart Total: ${cartTotal}`);
    console.log(`✓ All ${productsToAdd.length} products verified in shopping cart`);
    
    await page.screenshot({ path: 'screenshots/shopping-cart-multiple-products.png', fullPage: true });
  });
});
