import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { generateUniqueEmail, registrationTestData } from '../utils/testDataGenerator';

test.describe('User Registration', () => {
  let registrationPage: RegistrationPage;
  let uniqueEmail: string;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    uniqueEmail = generateUniqueEmail();
  });

  test('should successfully register a new user with valid credentials', async ({ page }) => {
    // Step 1: Navigate to the registration page
    await registrationPage.navigateToRegistration();

    // Step 2: Select Gender - Male
    await registrationPage.selectMaleGender();
    await expect(page.locator('input[id="gender-male"]')).toBeChecked();

    // Step 3: Enter First Name
    await registrationPage.enterFirstName(registrationTestData.firstName);
    await expect(registrationPage.firstNameInput).toHaveValue(registrationTestData.firstName);

    // Step 4: Enter Last Name
    await registrationPage.enterLastName(registrationTestData.lastName);
    await expect(registrationPage.lastNameInput).toHaveValue(registrationTestData.lastName);

    // Step 5: Enter unique email
    await registrationPage.enterEmail(uniqueEmail);
    await expect(registrationPage.emailInput).toHaveValue(uniqueEmail);

    // Step 6: Enter Password
    await registrationPage.enterPassword(registrationTestData.password);
    await expect(registrationPage.passwordInput).toHaveValue(registrationTestData.password);

    // Step 7: Confirm Password
    await registrationPage.confirmPassword(registrationTestData.password);
    await expect(registrationPage.confirmPasswordInput).toHaveValue(registrationTestData.password);

    // Step 8: Click Register button
    await registrationPage.clickRegister();

    // Step 9: Verify registration successful message is displayed
    await registrationPage.verifyRegistrationSuccess();

    // Step 10: Capture screenshot after successful registration
    await registrationPage.captureScreenshot('registration-successful.png');

    console.log(`Registration successful for user: ${uniqueEmail}`);
  });
});
