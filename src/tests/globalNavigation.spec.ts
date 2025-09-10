import { gotoURL, test, expect, registerUserAndLogout } from '@base/baseTest';


test.beforeEach(async ({ page, loginPage, navigationPanel, registerFormPage }) => {
     await gotoURL(page);

})

test("test home page button after successful login", async ({   navigationPanel, homePage, loginPage, registerFormPage }) => {
     //Register new user and logout
     const newUser = registerUserAndLogout(loginPage, registerFormPage, navigationPanel);

     //Login with the new unique user
     loginPage.enterUsername((await newUser).username);
     loginPage.enterPassword((await newUser).password);
     loginPage.clickLogin();
     //Click home page icon to navigate to home page
    navigationPanel.clickHomePage();
    expect(homePage.isATMServiceAvailable()).toBe(true);
})
