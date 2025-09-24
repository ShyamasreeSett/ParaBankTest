import {expect, gotoURL, registerUserWOlogout, test} from '@base/baseTest';
import {AccountType} from '@resources/accountType.enum';


test.beforeEach(async ({page, loginPage, navigationPanel, openNewAccount, registerFormPage, context}) => {
    // Clear cookies
    await context.clearCookies();
    await gotoURL(page);

    //Register with the new unique user
    await registerUserWOlogout(loginPage, registerFormPage);

    //Open new account
    await navigationPanel.clickOpenNewAccount();
    expect(await openNewAccount.isTitleVisible()).toBe(true);
    await openNewAccount.selectAccountType(AccountType.SAVINGS);
    await openNewAccount.waitUntilStable();
    await openNewAccount.clickOpenAccountButton();
})


test("test account number is created upon new account opening ", async ({openNewAccount}) => {
    test.info().annotations.push({type: "TestCaseID", description: "TC-006"});

    //Verify that account number was created
    expect(await openNewAccount.getNewAccountNo()).not.toBeNull();

})

test("test account balance upon new account opening", async ({
                                                                 navigationPanel,
                                                                 accountsOverviewPage
                                                             }) => {
    test.info().annotations.push({type: "TestCaseID", description: "TC-007"});
    await navigationPanel.clickAccountOverview();
    const originalTotalBalance = await accountsOverviewPage.getTotalBalance()

    await navigationPanel.clickOpenNewAccount();
    await navigationPanel.clickAccountOverview();

    //verify total balance of all accounts is the initial value
    expect(await accountsOverviewPage.getTotalBalance())
        .toBe(originalTotalBalance);
})
