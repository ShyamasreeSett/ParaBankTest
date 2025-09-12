import { gotoURL, test, expect, convertAccountBalanceToNumber, registerUserWOlogout } from '@base/baseTest';
import { myNavigationPanel } from '@pages/navigationPanel.page';
import { myOpenNewAccountPage } from '@pages/openNewAccount.page';
import { AccountType } from '@resources/accountType.enum';
import { TRANSFERPAGE } from '@resources/constants';


test.beforeEach(async ({ page, context, loginPage, registerFormPage }) => {
     // Clear cookies
     await context.clearCookies();
     await gotoURL(page);

     //Register with the new unique user
     const newUser = await registerUserWOlogout(loginPage, registerFormPage);
})

test("test transfer funds success", async ({ navigationPanel, openNewAccount, accountsOverviewPage, transferFundsPage }) => {
     test.info().annotations.push({ type: "TestCaseID", description: "TC-009" });

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
     await transferFundsPage.transferFund(TRANSFERPAGE.AMOUNT, accountNoNew, originalAccount[0]);


     //Verify that funds transfer was successful
     expect(await transferFundsPage.isSuccessTitleVisible()).toBe(true);
     expect(await transferFundsPage.getSuccessDesc()).toContain('$' + TRANSFERPAGE.AMOUNT + ' has been transferred from account #' + accountNoNew + ' to account #' + originalAccount[0]);

})

test("test end to end Fund Transfer Scenario", async ({ navigationPanel, openNewAccount, accountsOverviewPage, transferFundsPage }) => {
     test.info().annotations.push({ type: "TestCaseID", description: "TC-010" });

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
     await transferFundsPage.transferFund(TRANSFERPAGE.AMOUNT, accountNoNew, originalAccount[0]);

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
