import { gotoURL, test, expect } from '@base/baseTest';
import { AccountType } from '@resources/accountType.enum';


test.beforeEach(async ({ page, loginPage }) => {
     await gotoURL(page);

     //Login with the new unique user
     await loginPage.enterUsername('shya11');
     await loginPage.enterPassword('shya11!');
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
       //Verify that account number was created
     expect(await openNewAccount.getNewAccountNo()).not.toBeNull();
})