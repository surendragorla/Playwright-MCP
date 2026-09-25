import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('input.button-1.search-box-button');
    this.productTitles = page.locator('.product-item .product-title a');
  }

  async navigateToApplication(): Promise<void> {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }

  async searchForProduct(keyword: string): Promise<void> {
    await this.searchBox.fill(keyword);
    await this.searchButton.click();
  }

  async verifySearchResultsPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/search\?/i);
    await expect(this.page.getByText(/Search keyword:/i)).toBeVisible();
  }

  async verifyMatchingProductPresent(keyword: string): Promise<void> {
    const matchingProduct = this.productTitles.filter({ hasText: new RegExp(keyword, 'i') }).first();
    await expect(matchingProduct).toBeVisible();
  }
}
