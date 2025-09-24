import {type Locator, type Page} from '@playwright/test';

export class myHomePage {
    readonly page: Page;
    readonly title: Locator;
    readonly atmService: Locator;
    readonly withdrawFund: Locator;
    readonly withdrawFundTitle: Locator;


    //constructor
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('#showOverview > .title');
        this.atmService = page.locator('text="ATM Services"');
        this.withdrawFund = page.getByRole('link', {name: 'Withdraw Funds'}); //element by role with text
        this.withdrawFundTitle = page.locator('.title', {hasText: 'Withdraw Funds'});

    }

    async isATMServiceAvailable(): Promise<boolean> {
        try {
            await this.atmService.waitFor({state: 'visible'});
            return await this.atmService.isVisible();
        } catch (error) {
            console.error('ATM service link is not displayed in home page:', error);
            return false;
        }
    }

    async clickWithdrawFundsLink() {
        try {
            await this.withdrawFund.waitFor({state: 'visible'});
            await this.withdrawFund.click();
        } catch (error) {
            console.error('Withdraw funds link is not displayed in home page:', error);
        }
    }

    async iaWithdrawFundTitleDisplayed(): Promise<boolean> {
        try {
            return await this.withdrawFundTitle.isVisible();
        } catch (error) {
            console.error('Withdraw Funds title is not displayed ', error);
            return false;
        }
    }

}