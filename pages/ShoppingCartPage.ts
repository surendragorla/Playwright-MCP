import { Page, Locator, expect } from '@playwright/test';

export class ShoppingCartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly productNameInCart: Locator;
  readonly cartTotalPrice: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('table.cart tbody tr');
    this.productNameInCart = page.locator('table.cart tbody tr a.product-name');
    this.cartTotalPrice = page.locator('.totals .cart-total-right .order-total');
    this.checkoutButton = page.locator('button[name="checkout"]');
  }

  async navigateToCart(): Promise<void> {
    await this.page.goto('https://demowebshop.tricentis.com/cart');
  }

  async verifyCartPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart/i);
    await expect(this.page.getByText(/shopping cart/i)).toBeVisible();
  }

  async verifyProductExistsInCart(productName: string): Promise<void> {
    const product = this.page.locator(`table.cart tbody tr a.product-name:has-text("${productName}")`);
    await expect(product).toBeVisible();
  }

  async verifyCartIsNotEmpty(): Promise<void> {
    const itemCount = await this.cartItems.count();
    expect(itemCount).toBeGreaterThan(0);
  }

  async verifyCartTotalVisible(): Promise<void> {
    await expect(this.cartTotalPrice).toBeVisible();
  }

  async getCartTotalPrice(): Promise<string> {
    return await this.cartTotalPrice.textContent() || '';
  }

  async getProductQuantity(productName: string): Promise<string> {
    const quantityInput = this.page.locator(
      `table.cart tbody tr:has-text("${productName}") input[class*="qty"]`
    );
    return await quantityInput.inputValue();
  }

  async updateProductQuantity(productName: string, quantity: number): Promise<void> {
    const quantityInput = this.page.locator(
      `table.cart tbody tr:has-text("${productName}") input[class*="qty"]`
    );
    await quantityInput.fill(quantity.toString());
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.page.locator(
      `table.cart tbody tr:has-text("${productName}") input[name*="removefromcart"]`
    );
    await removeButton.click();
  }
}
