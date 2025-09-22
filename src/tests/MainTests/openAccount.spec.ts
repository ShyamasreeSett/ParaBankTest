import { gotoURL, test, expect, registerUserWOlogout } from '@base/baseTest';
import { AccountType } from '@resources/accountType.enum';


test.beforeEach(async ({ page, loginPage, registerFormPage }) => {
     await gotoURL(page);

     //Register with the new unique user
     await registerUserWOlogout(loginPage, registerFormPage);
})

test("test successful account opening", async ({ navigationPanel, openNewAccount }) => {
     test.info().annotations.push({ type: "TestCaseID", description: "TC-008" });

     //Click home page icon to navigate to home page
     await navigationPanel.clickOpenNewAccount();
     expect(await openNewAccount.isTitleVisible()).toBe(true);
     await openNewAccount.openNewAccount(AccountType.SAVINGS);

     //Verify that account opening was successful
     expect(await openNewAccount.isSuccessVisible()).toBe(true);
     //Verify that account number was created
     expect(await openNewAccount.getNewAccountNo()).not.toBeNull();
})