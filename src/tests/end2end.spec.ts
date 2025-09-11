import { gotoURL, test, expect, registerUserAndLogout } from '@base/baseTest';
import { AccountType } from '@resources/accountType.enum';
import { ACCOUNT_OVERVIEWPAGE, TRANSFERPAGE } from '@resources/constants';
import { getTransactions } from '@utils/apiHelper';
import { generatePayeeData } from '@utils/generateBeneficiary';
import * as dotenv from 'dotenv';

// Load env file
dotenv.config();

test.beforeEach(async ({ page, context, loginPage, navigationPanel, registerFormPage }) => {
     // Clear cookies
     await context.clearCookies();

     //________________________________________________________________________________
     //Step 1: Navigate to Para bank application.
     await gotoURL(page);
})

test("@e2e Test end to end Scenario", async ({ page, navigationPanel, openNewAccount, accountsOverviewPage, transferFundsPage, homePage, loginPage, registerFormPage, billPaymentFormPage, billPayPage, request }) => {

     //________________________________________________________________________________
     //Step 2: Create a new user from user registration page.
     const newUser = await registerUserAndLogout(loginPage, registerFormPage, navigationPanel);

     //________________________________________________________________________________
     //Step 3: Login to the application with the user created in step 2.
     await loginPage.login(newUser.username, newUser.password);

     // Grab cookies after login
     const cookies = await page.context().cookies();
     const sessionCookie = cookies.find(c => c.name === 'JSESSIONID');

     //________________________________________________________________________________
     //Step 4: Verify if the Global navigation menu in home page is working as expected.
     await navigationPanel.clickHomePage();
     expect(await homePage.isATMServiceAvailable()).toBe(true);

     //1st get the original account no 
     await navigationPanel.clickAccountOverview();
     const originalAccount = await accountsOverviewPage.getAccountOverview1stAccount();
     const originalAccountBalance = await convertAccountBalanceToNumber(originalAccount[1]);

     //________________________________________________________________________________
     //Step 5: Create a Savings account from “Open New Account Page” 
     await navigationPanel.clickOpenNewAccount();
     expect(await openNewAccount.isTitleVisible()).toBe(true);
     await openNewAccount.openNewAccount(AccountType.SAVINGS);

     //get the new account number
     const accountNoNew = await openNewAccount.getNewAccountNo();
     await navigationPanel.clickAccountOverview();

     //________________________________________________________________________________
     //Step 6: Validate if Accounts overview page is displaying the balance details as expected.
     //get the values of balances from the new account
     const accountRow: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNoNew);
     const newAccountBalance = await convertAccountBalanceToNumber(accountRow[1]);

     //verify total balance of all accounts is the initial value
     expect(await accountsOverviewPage.getTotalBalance())
          .toBe(Number(ACCOUNT_OVERVIEWPAGE.TOTALACCOUNT_BALANCE.replace('$', '').trim()));

     //________________________________________________________________________________
     //Step 7: Transfer funds from account created in step 5 to another account.
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

     //________________________________________________________________________________
     //Step 8: Pay the bill with account created in step 5.
     await navigationPanel.clickBillPay();
     const billForm = generatePayeeData(accountNoNew);

     // Fill and submit the bill payment form
     await billPaymentFormPage.fillForm(billForm);

     //Verify that funds transfer was successful
     expect(await billPayPage.isSuccessTitleVisible()).toBe(true);

     await navigationPanel.clickAccountOverview();

     //get all the updated account balances
     const UpdatedNewAccountRow2: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNoNew);
     const updatedNewAccountBalance2 = await convertAccountBalanceToNumber(UpdatedNewAccountRow2[1]);
     const billAmount = await convertAccountBalanceToNumber(billForm.amount);

     //Validate the final amount reflects the transfer and bill payment
     expect(updatedNewAccountBalance2).toBe(Number((newAccountBalance - transferAmountNo - billAmount).toFixed(2)));

     //_____________________________________________________________________________________________________________
     // Validate API response: 
     // Search the transactions using “Find transactions” API call by amount for the bill payment

     const response = await getTransactions(request, accountNoNew, billAmount, sessionCookie.value, process.env.BASE_URL);

     // Assert status code
     expect(response.status()).toBe(200);

     // Assert content type is JSON
     expect(response.headers()['content-type']).toContain('application/json');

     // Parse body
     const body = await response.json();

     // Validate that the array contains an object with the expected values
     expect(body).toEqual(
          expect.arrayContaining([
               expect.objectContaining({
                    accountId: Number(accountNoNew),       // convert to number
                    amount: Number(billForm.amount),       // convert to number
                    description: expect.stringContaining(billForm.payeeName),
                    type: 'Debit',
               }),
          ])
     );
});


async function convertAccountBalanceToNumber(balance: string) {
     return Number(balance.replace('$', '').trim());
}
