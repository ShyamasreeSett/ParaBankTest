import { gotoURL, test, expect } from '@base/baseTest';
import { AccountType } from '@resources/accountType.enum';
import { ACCOUNT_OVERVIEWPAGE } from '@resources/constants';


test.beforeEach(async ({ page, loginPage }) => {
     await gotoURL(page);

     //Login with the new unique user
     await loginPage.enterUsername('sett5');
     await loginPage.enterPassword('sett5');
     await loginPage.clickLogin();

})

test("test successful account opening", async ({ navigationPanel, openNewAccount }) => {

     //Click home page icon to navigate to home page
     await navigationPanel.clickOpenNewAccount();
     expect(await openNewAccount.isTitleVisible()).toBe(true);
     await openNewAccount.selectAccountType(AccountType.SAVINGS);
     await openNewAccount.waitUntilStable();
     await openNewAccount.clickOpenAccountButton();

     //Verify that account opening was successful
     expect(await openNewAccount.isSuccessVisible()).toBe(true);
})

test("test account number is created upon new account opening ", async ({ navigationPanel, openNewAccount }) => {

     //Click home page icon to navigate to home page
     await navigationPanel.clickOpenNewAccount();
     expect(await openNewAccount.isTitleVisible()).toBe(true);
     await openNewAccount.selectAccountType(AccountType.SAVINGS);
     await openNewAccount.waitUntilStable();
     await openNewAccount.clickOpenAccountButton();

     //Verify that account number was created
     expect(await openNewAccount.getNewAccountNo()).not.toBeNull();

})

test("test account balance upon new account opening", async ({ navigationPanel, openNewAccount, accountsOverviewPage }) => {

     //Click home page icon to navigate to home page
     await navigationPanel.clickOpenNewAccount();
     expect(await openNewAccount.isTitleVisible()).toBe(true);
     await openNewAccount.selectAccountType(AccountType.SAVINGS);
     await openNewAccount.waitUntilStable();
     await openNewAccount.clickOpenAccountButton();

     //get the new account number
     const accountNo = await openNewAccount.getNewAccountNo();
     await navigationPanel.clickAccountOverview();

     //get the valuesof balances from the new account
     const accountRow: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNo);

     //verify the new account balance is $100.00
     expect(accountRow[1])
          .toBe(ACCOUNT_OVERVIEWPAGE.NEWACCOUNT_BALANCE);

          //verify total balance of all accounts is the initail value
expect(await accountsOverviewPage.getTotalBalance())
          .toBe(Number(ACCOUNT_OVERVIEWPAGE.TOTALACCOUNT_BALANCE.replace('$', '').trim()));

})
