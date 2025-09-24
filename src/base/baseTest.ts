import {Page, test as baseTest} from '@playwright/test';
import {myLoginPage} from '@pages/login.page';
import {myRegisterFormPage} from '@pages/registerForm.page';
import {myWelcomePage} from '@pages/welcome.page';
import {generateUser} from '@utils/generateUser';
import {myNavigationPanel} from '@pages/navigationPanel.page';
import {myOpenNewAccountPage} from '@pages/openNewAccount.page';
import {myTranferFundsPage} from '@pages/transferFunds.page';
import {myAccountsOverviewPage} from '@pages/accountsOverview.page';
import {myHomePage} from '@pages/homePage';
import {myBillPayPage} from '@pages/billPay.page';
import {myBillPaymentFormPage} from '@pages/billPaymentForm.page';
import * as dotenv from 'dotenv';
import {attachment} from "allure-js-commons";
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
    loginPage: async ({page}, use) => {
        await use(new myLoginPage(page));
    },
    welcomePage: async ({page}, use) => {
        await use(new myWelcomePage(page));
    },
    accountsOverviewPage: async ({page}, use) => {
        await use(new myAccountsOverviewPage(page));
    },
    navigationPanel: async ({page}, use) => {
        await use(new myNavigationPanel(page));
    },
    homePage: async ({page}, use) => {
        await use(new myHomePage(page));
    },
    openNewAccount: async ({page}, use) => {
        await use(new myOpenNewAccountPage(page));
    },
    transferFundsPage: async ({page}, use) => {
        await use(new myTranferFundsPage(page));
    },
    billPayPage: async ({page}, use) => {
        await use(new myBillPayPage(page));
    },
    registerFormPage: async ({page}, use) => {
        await use(myRegisterFormPage(page));
    },
    billPaymentFormPage: async ({page}, use) => {
        await use(myBillPaymentFormPage(page));
    }
});

// Global afterEach for Allure
baseTest.afterEach(async ({page}, testInfo) => {
    // Only attach if test failed
    if (testInfo.status !== testInfo.expectedStatus) {

        // Screenshot (Buffer) → top-level
        const screenshot = await page.screenshot({fullPage: true});
        await attachment('Failure Screenshot', screenshot, 'image/png');

        // Video (file path) → top-level
        const video = testInfo.attachments.find(a => a.name === 'video');
        if (video?.path) {
            await attachment('Video', video.path, 'video/webm');
        }

        // Trace (file path) → top-level
        const trace = testInfo.attachments.find(a => a.name === 'trace');
        if (trace?.path) {
            await attachment('Trace', trace.path, 'application/zip');
        }
    }
});

// Utilities
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

async function registerUserWOlogout(loginPage: myLoginPage, registerFormPage: ReturnType<typeof myRegisterFormPage>) {
    await loginPage.clickRegisterLink();
    const newUser = generateUser();
    await registerFormPage.fillForm(newUser);
    return newUser;
}

async function convertAccountBalanceToNumber(balance: string) {
    return Number(balance.replace('$', '').trim());
}


export const test = testPages;
export const expect = testPages.expect;
export {gotoURL, registerUserWOlogout, registerUserAndLogout, convertAccountBalanceToNumber};