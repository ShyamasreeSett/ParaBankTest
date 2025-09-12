import { gotoURL, test, expect, registerUserAndLogout, convertAccountBalanceToNumber } from '@base/baseTest';
import { myNavigationPanel } from '@pages/navigationPanel.page';
import { myOpenNewAccountPage } from '@pages/openNewAccount.page';
import { AccountType } from '@resources/accountType.enum';
import { TRANSFERPAGE } from '@resources/constants';


test.beforeEach(async ({ page, context, loginPage, navigationPanel, registerFormPage }) => {
     // Clear cookies
     await context.clearCookies();
     await gotoURL(page);

     //Login with the new unique user
     const newUser = registerUserAndLogout(loginPage, registerFormPage, navigationPanel);

     //Login with the new unique user
     await loginPage.enterUsername((await newUser).username);
     await loginPage.enterPassword((await newUser).password);
     await loginPage.clickLogin();
})

test("test transfer funds success", async ({ navigationPanel, openNewAccount, accountsOverviewPage, transferFundsPage }) => {

     //1st get the original account no to get transfer to fund
     await navigationPanel.clickAccountOverview();
     const originalAccount = await accountsOverviewPage.getAccountOverview1stAccount();

     //OPen new account
     await openNewAccountForUser(navigationPanel, openNewAccount);

     //get the new account number
     const accountNoNew = await openNewAccount.getNewAccountNo();
     await navigationPanel.clickAccountOverview();

     //get the valuesof balances from the new account
     const accountRow: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNoNew);

     //Perform funds transfer
     await navigationPanel.clickTransferFunds();
     await transferFundsPage.enterTransferAmount(TRANSFERPAGE.AMOUNT);
     await transferFundsPage.selectFromAccount(accountNoNew);
     await transferFundsPage.selectToAccount(originalAccount[0]);
     await transferFundsPage.clickTransferButton();

     //Verify that funds transfer was successful
     expect(await transferFundsPage.isSuccessTitleVisible()).toBe(true);
     expect(await transferFundsPage.getSuccessDesc()).toContain('$' + TRANSFERPAGE.AMOUNT + ' has been transferred from account #' + accountNoNew + ' to account #' + originalAccount[0]);

})

test("test end to end Fund Transfer Scenario", async ({ navigationPanel, openNewAccount, accountsOverviewPage, transferFundsPage }) => {

     //1st get the original account no to get transfer to fund
     await navigationPanel.clickAccountOverview();
     const originalAccount = await accountsOverviewPage.getAccountOverview1stAccount();
     const originalAccountBalance = await convertAccountBalanceToNumber(originalAccount[1]);

     //OPen new account
     await openNewAccountForUser(navigationPanel, openNewAccount);

     //get the new account number
     const accountNoNew = await openNewAccount.getNewAccountNo();
     await navigationPanel.clickAccountOverview();

     //get the valuesof balances from the new account
     const accountRow: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNoNew);
     const newAccountBalance = await convertAccountBalanceToNumber(accountRow[1]);

     //Perform funds transfer
     await navigationPanel.clickTransferFunds();
     await transferFundsPage.enterTransferAmount(TRANSFERPAGE.AMOUNT);
     await transferFundsPage.selectFromAccount(accountNoNew);
     await transferFundsPage.selectToAccount(originalAccount[0]);
     await transferFundsPage.clickTransferButton();

     //Verify that funds transfer was successful
     expect(await transferFundsPage.isSuccessTitleVisible()).toBe(true);

     await navigationPanel.clickAccountOverview();

     //get all the updated account balances
     const UpdatedNewAccountRow: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNoNew);
     const updatedNewAccountBalance = await convertAccountBalanceToNumber(UpdatedNewAccountRow[1]);
     const updatedOriginalAccount = await accountsOverviewPage.getAccountOverview1stAccount();
     const updatedOriginalAccountBalance = await convertAccountBalanceToNumber(updatedOriginalAccount[1]);
     const transferAmountNo = await convertAccountBalanceToNumber(TRANSFERPAGE.AMOUNT);

     //Validate the balances have been updated in Account Overview page
     expect(updatedNewAccountBalance).toBe(newAccountBalance - transferAmountNo);
     expect(updatedOriginalAccountBalance).toBe(originalAccountBalance + transferAmountNo - newAccountBalance);

})

async function openNewAccountForUser(navigationPanel: myNavigationPanel, openNewAccount: myOpenNewAccountPage) {
     //Open new account 
     await navigationPanel.clickOpenNewAccount();
     expect(await openNewAccount.isTitleVisible()).toBe(true);
     await openNewAccount.selectAccountType(AccountType.SAVINGS);
     await openNewAccount.waitUntilStable();
     await openNewAccount.clickOpenAccountButton();
}
