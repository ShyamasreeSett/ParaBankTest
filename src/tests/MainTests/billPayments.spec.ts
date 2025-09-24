import {convertAccountBalanceToNumber, expect, gotoURL, registerUserWOlogout, test} from '@base/baseTest';
import {myNavigationPanel} from '@pages/navigationPanel.page';
import {myOpenNewAccountPage} from '@pages/openNewAccount.page';
import {AccountType} from '@resources/accountType.enum';
import {generatePayeeData} from '@utils/generateBeneficiary';


test.beforeEach(async ({page, context, loginPage, registerFormPage}) => {
    // Clear cookies
    await context.clearCookies();
    await gotoURL(page);

    //Register with the new unique user
    await registerUserWOlogout(loginPage, registerFormPage);
})

test("test bill payment success", async ({navigationPanel, openNewAccount, billPaymentFormPage, billPayPage}) => {
    test.info().annotations.push({type: "TestCaseID", description: "TC-011"});

    //OPen new account
    await openNewAccountForUser(navigationPanel, openNewAccount);

    //get the new account number
    const accountNoNew = await openNewAccount.getNewAccountNo();

    //Pay the bill
    await navigationPanel.clickBillPay();
    const billForm = generatePayeeData(accountNoNew);

    // Fill and submit the bill payment form
    await billPaymentFormPage.fillForm(billForm);

    //Verify that funds transfer was successful
    expect(await billPayPage.isSuccessTitleVisible()).toBe(true);
    expect(await billPayPage.getSuccessDesc()).toContain('Bill Payment to ' + billForm.payeeName + ' in the amount of $' + billForm.amount + ' from account ' + accountNoNew + ' was successful.');

})

test("test end to end Fund Transfer Scenario", async ({
                                                          navigationPanel,
                                                          openNewAccount,
                                                          accountsOverviewPage,
                                                          billPaymentFormPage,
                                                          billPayPage
                                                      }) => {
    test.info().annotations.push({type: "TestCaseID", description: "TC-012"});

    //1st get the original account no to get transfer to fund
    await navigationPanel.clickAccountOverview();

    //OPen new account
    await openNewAccountForUser(navigationPanel, openNewAccount);

    //get the new account number
    const accountNoNew = await openNewAccount.getNewAccountNo();

    //get the new account balance
    await navigationPanel.clickAccountOverview();
    const accountRow: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNoNew);
    const newAccountBalance = accountRow[1];

    //Pay the bill
    await navigationPanel.clickBillPay();
    const billForm = generatePayeeData(accountNoNew);

    // Fill and submit the bill payment form
    await billPaymentFormPage.fillForm(billForm);

    //Verify that funds transfer was successful
    expect(await billPayPage.isSuccessTitleVisible()).toBe(true);

    await navigationPanel.clickAccountOverview();

    //get all the updated account balances
    const UpdatedNewAccountRow: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNoNew);
    const updatedNewAccountBalance = await convertAccountBalanceToNumber(UpdatedNewAccountRow[1]);
    const billAmount = await convertAccountBalanceToNumber(billForm.amount);
    const originalBalance = await convertAccountBalanceToNumber(newAccountBalance);

    expect(updatedNewAccountBalance).toBe(originalBalance - billAmount);
})

async function openNewAccountForUser(navigationPanel: myNavigationPanel, openNewAccount: myOpenNewAccountPage) {
    //Open new account
    await navigationPanel.clickOpenNewAccount();
    expect(await openNewAccount.isTitleVisible()).toBe(true);
    await openNewAccount.selectAccountType(AccountType.SAVINGS);
    await openNewAccount.waitUntilStable();
    await openNewAccount.clickOpenAccountButton();
}