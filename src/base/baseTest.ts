import { test as baseTest, Page } from '@playwright/test';
import { myLoginPage } from '@pages/login.page';
import { myRegisterFormPage } from '@pages/registerForm.page';
import { myWelcomePage } from '@pages/welcome.page';
import { generateUser } from '@utils/generateUser';
import { myNavigationPanel } from '@pages/navigationPanel.page';
import { myOpenNewAccountPage } from '@pages/openNewAccount.page';
import { myTranferFundsPage } from '@pages/transferFunds.page';
import { myAccountsOverviewPage } from '@pages/accountsOverview.page';
import { myHomePage } from '@pages/homePage';
import { myBillPayPage } from '@pages/billPay.page';
import { myBillPaymentFormPage } from '@pages/billPaymentForm.page';
import * as dotenv from 'dotenv';
// Load env file
dotenv.config();

// Create instances of the page classes
type Pages = {
  loginPage: myLoginPage;
  welcomePage: myWelcomePage;
  accountsOverviewPage: myAccountsOverviewPage;
  navigationPanel: myNavigationPanel;
  homePage: myHomePage;
  openNewAccount: myOpenNewAccountPage;
  transferFundsPage: myTranferFundsPage;
  billPayPage: myBillPayPage;
  registerFormPage: ReturnType<typeof myRegisterFormPage>;
  billPaymentFormPage: ReturnType<typeof myBillPaymentFormPage>;
};

const testPages = baseTest.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new myLoginPage(page));
  },
  welcomePage: async ({ page }, use) => {
    await use(new myWelcomePage(page));
  },
  accountsOverviewPage: async ({ page }, use) => {
    await use(new myAccountsOverviewPage(page));
  },
  navigationPanel: async ({ page }, use) => {
    await use(new myNavigationPanel(page));
  },
  homePage: async ({ page }, use) => {
    await use(new myHomePage(page));
  },
  openNewAccount: async ({ page }, use) => {
    await use(new myOpenNewAccountPage(page));
  },
  transferFundsPage: async ({ page }, use) => {
    await use(new myTranferFundsPage(page));
  },
  billPayPage: async ({ page }, use) => {
    await use(new myBillPayPage(page));
  },
  registerFormPage: async ({ page }, use) => {
    await use(myRegisterFormPage(page));
  },
  billPaymentFormPage: async ({ page }, use) => {
    await use(myBillPaymentFormPage(page));
  }
});

async function gotoURL(page: Page) {
  try {
    return await page.goto(process.env.PARABANK_URL);
  } catch (error) {
    console.error('Error while opening parabank url');
  }
}

async function registerUserAndLogout(loginPage: myLoginPage, registerFormPage: ReturnType<typeof myRegisterFormPage>, navigationPanel: myNavigationPanel) {
  await loginPage.clickRegisterLink();
  const newUser = generateUser();
  await registerFormPage.fillForm(newUser);
  await navigationPanel.userLogout();
  return newUser;
}
async function registerUserAndLogin(loginPage: myLoginPage, registerFormPage: ReturnType<typeof myRegisterFormPage>, navigationPanel: myNavigationPanel) {
  const newUser = await registerUserAndLogout(loginPage, registerFormPage, navigationPanel);
  loginPage.enterUsername(newUser.username);
  loginPage.enterPassword(newUser.password);
  loginPage.clickLogin();

  return newUser;
}

async function convertAccountBalanceToNumber(balance: string) {
     return Number(balance.replace('$', '').trim());
}


export const test = testPages;
export const expect = testPages.expect;
export { gotoURL, registerUserAndLogin, registerUserAndLogout, convertAccountBalanceToNumber };