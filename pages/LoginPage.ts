import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;
  readonly userEmailHeader: Locator;
  readonly validationSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    // Navigation and Login Link
    this.loginLink = page.getByRole('link', { name: /log in/i });
    
    // Login Form Inputs using element IDs
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    
    // Login Button - Input submit button with value "Log in"
    this.loginButton = page.locator('input[type="submit"][value="Log in"]');
    
    // Logout Link - appears after successful login
    this.logoutLink = page.getByRole('link', { name: /log out/i });
    
    // User email in header - displayed after successful login (first account link contains email)
    this.userEmailHeader = page.locator('a.account').first();

    // Validation summary - displayed on failed login attempts
    this.validationSummary = page.locator('.validation-summary-errors');
  }

  /**
   * Navigate to the application home page
   */
  async navigateToApplication(): Promise<void> {
    await this.page.goto('https://demowebshop.tricentis.com/');
  }

  /**
   * Click on Login link to navigate to login page
   */
  async clickLoginLink(): Promise<void> {
    await this.loginLink.click();
    await this.page.waitForURL('**/login');
  }

  /**
   * Enter email in login form
   */
  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Enter password in login form
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button to submit login form
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
    // Wait for navigation to complete after login
    await this.page.waitForURL('**/');
  }

  /**
   * Submit login form and wait for validation summary (used for invalid login)
   */
  async submitLoginExpectingFailure(): Promise<void> {
    await this.loginButton.click();
    await expect(this.validationSummary).toBeVisible();
  }

  /**
   * Verify logout link is visible (indicates successful login)
   */
  async verifyLogoutLinkVisible(): Promise<void> {
    await expect(this.logoutLink).toBeVisible();
  }

  /**
   * Verify user email is displayed in header
   */
  async verifyUserEmailInHeader(email: string): Promise<void> {
    await expect(this.userEmailHeader).toContainText(email);
  }

  /**
   * Get user email from header
   */
  async getUserEmailFromHeader(): Promise<string | null> {
    return await this.userEmailHeader.textContent();
  }

  /**
   * Capture screenshot
   */
  async captureScreenshot(fileName: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${fileName}`, fullPage: true });
  }

  /**
   * Get login error/validation text
   */
  async getLoginErrorText(): Promise<string | null> {
    return await this.validationSummary.textContent();
  }
}
