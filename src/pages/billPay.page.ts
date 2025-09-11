import { type Locator, type Page } from '@playwright/test';

export class myBillPayPage {
    readonly page: Page;
    readonly amount: Locator;
    readonly transfer: Locator;
    readonly title: Locator;
    readonly successDesc: Locator;

    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.title', { hasText: 'Bill Payment Complete' });
        this.successDesc = this.title.locator('xpath=following-sibling::p[1]');
    }

    async isSuccessTitleVisible() {
        try {
            await this.title.waitFor({ state: 'visible' });
            return (await this.title.isVisible());
        } catch (error) {
            console.error('success title is not displayed after billPayment ', error);
            return false;
        }
    }

    async getSuccessDesc() {
        try {
            console.log(await this.successDesc.allTextContents());
            return (await this.successDesc.textContent());
        } catch (error) {
            console.error('success title is not displayed after billPayment ', error);
            return 'random';
        }
    }
}