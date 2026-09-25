/**
 * Generate a unique email address
 */
export function generateUniqueEmail(): string {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  return `testuser_${timestamp}_${randomNum}@example.com`;
}

/**
 * Test data for registration
 */
export const registrationTestData = {
  firstName: 'John',
  lastName: 'Doe',
  password: 'Test@123',
};

/**
 * Test data for login
 * Using a pre-registered user account
 */
export const loginTestData = {
  email: 'testuser_1790229831861_6618@example.com',
  password: 'Test@123',
};
