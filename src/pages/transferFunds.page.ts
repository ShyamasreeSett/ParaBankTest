import { type Locator, type Page, expect } from '@playwright/test';

export class myTranferFundsPage {
    readonly page: Page;
    readonly amount: Locator;
    readonly transfer: Locator;
    readonly title: Locator;
    readonly successDesc: Locator;



    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.amount = page.locator('#amount');
        this.transfer = page.getByRole('button', { name: 'Transfer' });
        this.title = page.locator('.title', { hasText: 'Transfer Complete!' });
        this.successDesc = this.title.locator('xpath=following-sibling::p[1]');

    }

    async enterTransferAmount(transferAmount: string) {
        try {
            await this.amount.fill(transferAmount);
        } catch (error) {
            console.error('Unable to enter amount of fund should be transfered', error);
        }
    }
    async selectFromAccount(accountNo: string) {
        try {
            await this.page.selectOption('#fromAccountId', accountNo);
        } catch (error) {
            console.error('Could not select the correct account number fom which fund should be transfered', error);
        }
    }

    async selectToAccount(accountNo: string) {
        try {
            await this.page.selectOption('#toAccountId', accountNo);
        } catch (error) {
            console.error('Could not select the correct account number to which fund should be transfered', error);
        }
    }

    async clickTransferButton() {
        try {
            await this.transfer.click();
        } catch (error) {
            console.error('Could not click on transfer button', error);
        }
    }

    async isSuccessTitleVisible() {
        try {
                        await this.title.waitFor({ state: 'visible' });
            return (await this.title.isVisible());
        } catch (error) {
            console.error('success title is not displayed after transfer ', error);
            return false;
        }
    }

    async getSuccessDesc(){
        try {
            console.log(await this.successDesc.allTextContents());
            return (await this.successDesc.textContent());
        } catch (error) {
            console.error('success title is not displayed after transfer ', error);
            return 'random';
        }
    }

}