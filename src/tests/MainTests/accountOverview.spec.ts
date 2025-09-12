import { gotoURL, test, expect, registerUserWOlogout } from '@base/baseTest';
import { AccountType } from '@resources/accountType.enum';
import { ACCOUNT_OVERVIEWPAGE } from '@resources/constants';


test.beforeEach(async ({ page, loginPage, navigationPanel, openNewAccount, registerFormPage, context }) => {
     // Clear cookies
     await context.clearCookies();
     await gotoURL(page);

     //Register with the new unique user
     const newUser = await registerUserWOlogout(loginPage, registerFormPage);

     //Open new account 
     await navigationPanel.clickOpenNewAccount();
     expect(await openNewAccount.isTitleVisible()).toBe(true);
     await openNewAccount.selectAccountType(AccountType.SAVINGS);
     await openNewAccount.waitUntilStable();
     await openNewAccount.clickOpenAccountButton();
})


test("test account number is created upon new account opening ", async ({ openNewAccount }) => {
     test.info().annotations.push({ type: "TestCaseID", description: "TC-006" });

     //Verify that account number was created
     expect(await openNewAccount.getNewAccountNo()).not.toBeNull();

})

test("test account balance upon new account opening", async ({ navigationPanel, openNewAccount, accountsOverviewPage }) => {
     test.info().annotations.push({ type: "TestCaseID", description: "TC-007" });

     //get the new account number
     const accountNo = await openNewAccount.getNewAccountNo();
     await navigationPanel.clickAccountOverview();

     //get the valuesof balances from the new account
     const accountRow: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNo);

     //get the new account balance 
     const newAccountBalance = accountRow[1];

     //verify total balance of all accounts is the initail value
     expect(await accountsOverviewPage.getTotalBalance())
          .toBe(Number(ACCOUNT_OVERVIEWPAGE.TOTALACCOUNT_BALANCE.replace('$', '').trim()));

})
