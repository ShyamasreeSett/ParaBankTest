import {type Locator, type Page} from '@playwright/test';
import {NA} from "@resources/constants";

export class myOpenNewAccountPage {
    readonly page: Page;
    readonly title: Locator;
    readonly submit: Locator;
    readonly success: Locator;
    readonly accountNo: Locator;

    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.title', {hasText: 'Open New Account'});
        this.submit = page.getByRole('button', {name: 'Open New Account'});
        this.success = page.locator('.title', {hasText: 'Account Opened!'});
        this.accountNo = page.locator('#newAccountId');
    }

    async isTitleVisible(): Promise<boolean> {
        try {
            return (await this.title.isVisible());
        } catch (error) {
            console.error('Title is not displayed in new account page:', error);
            return false;
        }
    }

    async selectAccountType(accountType: string) {
        try {
            await this.page.selectOption('#type', accountType);
        } catch (error) {
            console.error('Could not select the correct account type', error);
        }
    }

    async clickOpenAccountButton() {
        try {
            await this.submit.click();
        } catch (error) {
            console.error('Could not click on the Open new account button', error);
        }
    }

    async isSuccessVisible(): Promise<boolean> {
        try {
            await this.accountNo.waitFor({state: 'visible'});
            return (await this.success.isVisible());
        } catch (error) {
            console.error('We did not succeed in opening new account', error);
            return false;
        }
    }

    async getNewAccountNo(): Promise<string> {
        try {
            await this.accountNo.waitFor({state: 'visible'});
            return (await this.accountNo.textContent());
        } catch (error) {
            console.error('We did not succeed to get a new account number', error);
            return NA;
        }
    }

    // Wait until network is idle (page is stable)
    async waitUntilStable() {
        await this.page.waitForLoadState('networkidle'); // waits until no network requests for ~500ms
    }

    async openNewAccount(accountType: string) {
        //OPen new SAVINGS account
        await this.selectAccountType(accountType);
        await this.waitUntilStable();
        await this.clickOpenAccountButton();
    }
}