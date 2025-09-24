import {convertAccountBalanceToNumber, expect, gotoURL, registerUserAndLogout, test} from '@base/baseTest';
import {AccountType} from '@resources/accountType.enum';
import {API, TRANSFERPAGE} from '@resources/constants';
import {getTransactions} from '@utils/apiHelper';
import {generatePayeeData} from '@utils/generateBeneficiary';

import * as dotenv from 'dotenv';
import {label} from "allure-js-commons";

// Load env file
dotenv.config();

test.beforeEach(async ({page, context}) => {
    // Clear cookies
    await context.clearCookies();

    //________________________________________________________________________________
    //Step 1: Navigate to Para bank application.
    await gotoURL(page);
})

test("@e2e Verify end to end account fund transfer scenario", async ({
                                                                         page,
                                                                         navigationPanel,
                                                                         openNewAccount,
                                                                         accountsOverviewPage,
                                                                         transferFundsPage,
                                                                         homePage,
                                                                         loginPage,
                                                                         registerFormPage,
                                                                         billPaymentFormPage,
                                                                         billPayPage,
                                                                         request
                                                                     }) => {

    await label('owner', 'Sett');    // Step 2
    const newUser = await test.step("Step 2: Create a new user from user registration page.", async () => {
        return await registerUserAndLogout(loginPage, registerFormPage, navigationPanel);
    });

    // Step 3
    const sessionCookie = await test.step("Step 3: Login to the application with the user created in step 2.", async () => {
        await loginPage.login(newUser.username, newUser.password);

        const cookies = await page.context().cookies();
        return cookies.find(c => c.name === "JSESSIONID");
    });

    // Step 4
    const {
        originalAccount,
        originalAccountBalance,
        originalTotalBalance
    } = await test.step("Step 4: Verify if the Global navigation menu in home page is working as expected.", async () => {
        await navigationPanel.clickHomePage();
        expect(await homePage.isATMServiceAvailable()).toBe(true);

        await navigationPanel.clickAccountOverview();
        const acc = await accountsOverviewPage.getAccountOverview1stAccount();
        return {
            originalAccount: acc,
            originalAccountBalance: await convertAccountBalanceToNumber(acc[1]),
            originalTotalBalance: await accountsOverviewPage.getTotalBalance()
        };
    });

    // Step 5
    const accountNoNew = await test.step("Step 5: Create a Savings account from Open New Account Page.", async () => {
        await navigationPanel.clickOpenNewAccount();
        expect(await openNewAccount.isTitleVisible()).toBe(true);
        await openNewAccount.openNewAccount(AccountType.SAVINGS);
        return await openNewAccount.getNewAccountNo();
    });

    // Step 6
    const newAccountBalance = await test.step("Step 6: Validate if Accounts overview page is displaying the balance details as expected.", async () => {
        await navigationPanel.clickAccountOverview();
        const accountRow: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNoNew);
        const bal = await convertAccountBalanceToNumber(accountRow[1]);

        expect(await accountsOverviewPage.getTotalBalance())
            .toBe(originalTotalBalance);
        return bal;
    });

    // Step 7
    const transferAmountNo = await test.step("Step 7: Transfer funds from account created in step 5 to another account.", async () => {
        await navigationPanel.clickTransferFunds();
        await transferFundsPage.transferFund(TRANSFERPAGE.AMOUNT, accountNoNew, originalAccount[0]);

        expect(await transferFundsPage.isSuccessTitleVisible()).toBe(true);

        await navigationPanel.clickAccountOverview();

        const UpdatedNewAccountRow: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNoNew);
        const updatedNewAccountBalance = await convertAccountBalanceToNumber(UpdatedNewAccountRow[1]);
        const updatedOriginalAccount = await accountsOverviewPage.getAccountOverview1stAccount();
        const updatedOriginalAccountBalance = await convertAccountBalanceToNumber(updatedOriginalAccount[1]);
        const amountNo = await convertAccountBalanceToNumber(TRANSFERPAGE.AMOUNT);

        expect(updatedNewAccountBalance).toBe(newAccountBalance - amountNo);
        expect(updatedOriginalAccountBalance).toBe(originalAccountBalance + amountNo - newAccountBalance);

        return amountNo;
    });

    // Step 8
    const billForm = await test.step("Step 8: Pay the bill with account created in step 5.", async () => {
        await navigationPanel.clickBillPay();
        const billForm = generatePayeeData(accountNoNew);

        await billPaymentFormPage.fillForm(billForm);
        expect(await billPayPage.isSuccessTitleVisible()).toBe(true);

        await navigationPanel.clickAccountOverview();

        const UpdatedNewAccountRow2: string[] = await accountsOverviewPage.getAccountOverviewRow(accountNoNew);
        const updatedNewAccountBalance2 = await convertAccountBalanceToNumber(UpdatedNewAccountRow2[1]);
        const amount = await convertAccountBalanceToNumber(billForm.amount);
        expect(updatedNewAccountBalance2).toBe(Number((newAccountBalance - transferAmountNo - amount).toFixed(2)));

        return billForm;
    });

    // API Validation
    await test.step("Validate API response: Search the transactions using Find transactions API call by amount for the bill payment", async () => {
        const amount = await convertAccountBalanceToNumber(billForm.amount);

        const response = await getTransactions(request, accountNoNew, amount, sessionCookie.value, process.env.BASE_URL);
        expect(response.status()).toBe(Number(API.STATUS));
        expect(response.headers()["content-type"]).toContain(API.CONTENT_TYPE);

        const body = await response.json();
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    accountId: Number(accountNoNew),
                    amount: Number(amount),
                    description: expect.stringContaining(billForm.payeeName), // adjust if needed
                    type: API.TYPE,
                }),
            ])
        );
    });
});
