import { test as base, expect } from '@playwright/test';

export type InvalidCredentials = {
  email: string;
  password: string;
};

export const test = base.extend<{ invalidCredentials: InvalidCredentials }>({
  invalidCredentials: async ({}, use) => {
    await use({
      email: 'invalid_user@example.com',
      password: 'WrongPass123!'
    });
  },
});

export { expect };
