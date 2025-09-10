import { type Locator, type Page, expect } from '@playwright/test';

export class myTranferFundsPage {
    readonly page: Page;
    readonly title: Locator;
    readonly table: Locator;
    readonly total: Locator;
    readonly balanceCells: Locator;


    //constructor 
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('#showOverview > .title');
        this.table = page.locator('#accountTable');
        this.total = page.locator('#accountTable');
        this.total = page.locator('text="Total"');
        this.balanceCells = page.locator('//table[@id="accountTable"]//tr[td/a]/td[2]');
    }

    async getTitle() {
        try {
            await this.title.waitFor({ state: 'visible' });
            return (await this.title.textContent()).trim();
        } catch (error) {
            console.error('Title is not displayed in overview page:', error);
        }
    }

    async getAccountOverviewRow(account: string): Promise<string[]> {
        try {
            await this.total.waitFor({ state: 'visible' });
            const rowN = this.page.locator(`//table[@id="accountTable"]//tr[td/a[text()="${account}"]]`);
            const allCells = rowN.locator('td');
            return (await allCells.allTextContents());// return all elements in the row as array
        } catch (error) {
            console.error('Account rows were not available', error);
        }
    }

    async calculateTotalBalance() {
        try {
            const balanceTexts = await this.balanceCells.allTextContents();
            //replace the dollar symbols and convert to number
            const balances = balanceTexts.map(text => Number(text.replace('$', '').trim()));

            //add the values
            const total = balances.reduce((acc, val) => acc + val, 0);

            return total;
        } catch (error) {
            console.error('Account rows were not available', error);
        }
    }

}