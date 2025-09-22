import {expect, gotoURL, registerUserWOlogout, test} from '@base/baseTest';

test.beforeEach(async ({page}) => {
    await gotoURL(page);

})

test("test home page button after successful login", async ({
                                                                navigationPanel,
                                                                homePage,
                                                                loginPage,
                                                                registerFormPage
                                                            }) => {
    test.info().annotations.push({type: "TestCaseID", description: "TC-005"});

    //Register new user 
    await registerUserWOlogout(loginPage, registerFormPage);

    //Click home page icon to navigate to home page
    await navigationPanel.clickHomePage();
    expect(await homePage.isATMServiceAvailable()).toBe(true);
})


test("test ATM services availability", async ({navigationPanel, homePage, loginPage, registerFormPage}) => {
    test.info().annotations.push({type: "TestCaseID", description: "TC-013"});

    //Register new user 
    await registerUserWOlogout(loginPage, registerFormPage);

    //Click home page icon to navigate to home page
    await navigationPanel.clickHomePage();
    await homePage.clickWithdrawFundsLink();
    expect(await homePage.iaWithdrawFundTitleDisplayed()).toBe(true);
})
