import { test, expect } from './fixtures';
import { LoginPage } from '../pages/LoginPage';
import { loginTestData } from '../utils/testDataGenerator';

test.describe('User Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Step 1: Open application
    await loginPage.navigateToApplication();

    // Step 2: Click Login link
    await loginPage.clickLoginLink();

    // Step 3: Enter valid email
    await loginPage.enterEmail(loginTestData.email);
    await expect(loginPage.emailInput).toHaveValue(loginTestData.email);

    // Step 4: Enter valid password
    await loginPage.enterPassword(loginTestData.password);
    await expect(loginPage.passwordInput).toHaveValue(loginTestData.password);

    // Step 5: Click Login button
    await loginPage.clickLoginButton();

    // Step 6: Verify Logout link is visible
    await loginPage.verifyLogoutLinkVisible();
    console.log('✓ Logout link is visible');

    // Step 7: Verify user email is displayed in header
    const headerEmail = await loginPage.getUserEmailFromHeader();
    console.log(`User email in header: ${headerEmail}`);
    expect(headerEmail).toContain(loginTestData.email);

    // Capture screenshot after successful login
    await loginPage.captureScreenshot('login-successful.png');
    console.log(`✓ Login successful for user: ${loginTestData.email}`);
  });

  test('should show validation message for invalid credentials', async ({ page, invalidCredentials }) => {
    // Navigate to application and open login page
    await loginPage.navigateToApplication();
    await loginPage.clickLoginLink();

    // Enter invalid credentials from fixture
    await loginPage.enterEmail(invalidCredentials.email);
    await expect(loginPage.emailInput).toHaveValue(invalidCredentials.email);
    await loginPage.enterPassword(invalidCredentials.password);
    await expect(loginPage.passwordInput).toHaveValue(invalidCredentials.password);

    // Submit and expect validation error
    await loginPage.submitLoginExpectingFailure();
    const errorText = await loginPage.getLoginErrorText();
    console.log(`Login error text: ${errorText}`);
    expect(errorText).toContain('Login was unsuccessful');

    // Capture screenshot of the failed login
    await loginPage.captureScreenshot('login-invalid.png');
  });
});
