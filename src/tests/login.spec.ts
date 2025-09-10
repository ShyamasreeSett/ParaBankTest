import { gotoURL, test, expect, registerUserAndLogout } from '@base/baseTest';
import { ACCOUNT_OVERVIEWPAGE, LOGINPAGE } from '@resources/constants';


test.beforeEach(async ({ page }) => {
     await gotoURL(page);
})

test("test successful login", async ({ loginPage, accountsOverviewPage, navigationPanel, registerFormPage }) => {
     //Register new user and logout
     const newUser = registerUserAndLogout(loginPage, registerFormPage, navigationPanel);

     //Login with the new unique user
     loginPage.enterUsername((await newUser).username);
     loginPage.enterPassword((await newUser).password);
     loginPage.clickLogin();

     // Verify login with correct user
     expect(await navigationPanel.getUserName())
          .toBe('Welcome ' + (await newUser).firstName + ' ' + (await newUser).lastName);

     //Verify login to Accounts overview page
     expect(await accountsOverviewPage.getTitle())
          .toBe(ACCOUNT_OVERVIEWPAGE.TITLE);
})

test("test unsuccessful login with null password", async ({ loginPage, navigationPanel, registerFormPage }) => {
     //Register new user and logout
     const newUser = registerUserAndLogout(loginPage, registerFormPage, navigationPanel);

     loginPage.enterUsername((await newUser).username);
     //Do not enter password
     loginPage.clickLogin();
     // Verify error message titile
     expect(await loginPage.getErrorTitle())
          .toBe(LOGINPAGE.ERROR_TITLE);
     //Verify error message description
     expect(await loginPage.getErrorDesription())
          .toBe(LOGINPAGE.ERROR_DESC);
})
test("test unsuccessful login with null username and password", async ({ loginPage }) => {


     //Do not enter username and password
     loginPage.clickLogin();
     // Verify error message titile
     expect(await loginPage.getErrorTitle())
          .toBe(LOGINPAGE.ERROR_TITLE);
     //Verify error message description
     expect(await loginPage.getErrorDesription())
          .toBe(LOGINPAGE.ERROR_DESC);
})