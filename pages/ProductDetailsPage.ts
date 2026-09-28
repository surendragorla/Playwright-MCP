import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.product-name h1');
    this.productPrice = page.locator('.product-price .price-value-31, .product-price span[itemprop="price"]');
    this.addToCartButton = page.locator('input.button-1.add-to-cart-button');
  }

  async getProductName(): Promise<string> {
    return await this.productName.textContent() || '';
  }

  async verifyProductNameDisplayed(): Promise<void> {
    await expect(this.productName).toBeVisible();
  }

  async verifyProductNameMatches(expectedName: string): Promise<void> {
    await expect(this.productName).toContainText(expectedName);
  }

  async verifyPriceIsDisplayed(): Promise<void> {
    await expect(this.productPrice).toBeVisible();
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.textContent() || '';
  }

  async verifyAddToCartButtonExists(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toBeEnabled();
  }

  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}
