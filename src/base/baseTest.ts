import { test as baseTest } from '@playwright/test';
import { myLoginPage } from '@pages/login.page';
import { myRegisterFormPage } from '@pages/registerForm.page';

// Use InstanceType to get the type of an instance of the class
type Pages = {
  loginPage: myLoginPage; // keep login page type as-is
  registerFormPage: ReturnType<typeof myRegisterFormPage>;
};

export const test = baseTest.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new myLoginPage(page));
  },
  registerFormPage: async ({ page }, use) => {
    await use(myRegisterFormPage(page));
  }
});
