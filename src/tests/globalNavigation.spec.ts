import { gotoURL, test, expect, registerUserAndLogout } from '@base/baseTest';


test.beforeEach(async ({ page, loginPage, navigationPanel, registerFormPage }) => {
    await gotoURL(page);

})

test("test home page button after successful login", async ({ navigationPanel, homePage, loginPage, registerFormPage }) => {
    //Register new user and logout
    const newUser = registerUserAndLogout(loginPage, registerFormPage, navigationPanel);

    //Login with the new unique user
    await loginPage.enterUsername((await newUser).username);
    await loginPage.enterPassword((await newUser).password);
    await loginPage.clickLogin();
    //Click home page icon to navigate to home page
    await navigationPanel.clickHomePage();
    expect(await homePage.isATMServiceAvailable()).toBe(true);
})
