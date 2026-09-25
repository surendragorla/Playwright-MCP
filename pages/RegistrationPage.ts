import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly registerLink: Locator;
  readonly maleGenderRadio: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Navigation and Registration Link
    this.registerLink = page.getByRole('link', { name: /register/i });
    
    // Gender Selection - Male radio button
    this.maleGenderRadio = page.locator('#gender-male');
    
    // Form Inputs using element IDs
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    
    // Submit Button
    this.registerButton = page.getByRole('button', { name: /register/i });
    
    // Success Message
    this.successMessage = page.getByText(/your registration completed/i);
  }

  /**
   * Navigate to the registration page
   */
  async navigateToRegistration(): Promise<void> {
    await this.page.goto('https://demowebshop.tricentis.com/');
    await this.registerLink.click();
    await this.page.waitForURL('**/register');
  }

  /**
   * Select Male gender
   */
  async selectMaleGender(): Promise<void> {
    await this.maleGenderRadio.check();
  }

  /**
   * Enter first name
   */
  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Enter last name
   */
  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Enter email
   */
  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Confirm password
   */
  async confirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  /**
   * Click register button
   */
  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }

  /**
   * Verify registration success message is displayed
   */
  async verifyRegistrationSuccess(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  /**
   * Capture screenshot
   */
  async captureScreenshot(fileName: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${fileName}`, fullPage: true });
  }
}
